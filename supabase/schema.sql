-- Avenue website initial Supabase schema
-- Run in Supabase SQL editor.

-- Optional helper extension for UUID generation (if needed later)
create extension if not exists pgcrypto;

-- Profiles: one row per auth user
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'member' check (role in ('admin', 'member')),
  phone text,
  directory_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Public-facing Events
create table if not exists public.events (
  id bigserial primary key,
  title text not null,
  description text not null default '',
  event_date timestamptz not null,
  location text not null default '',
  image_url text,
  category text not null default 'general',
  is_published boolean not null default true,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Public-facing Ministries
create table if not exists public.ministries (
  id bigserial primary key,
  name text not null,
  description text not null default '',
  schedule text,
  leader_name text,
  image_url text,
  is_published boolean not null default true,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Donation records (metadata only; no card data)
create table if not exists public.donations (
  id bigserial primary key,
  donor_profile_id uuid references public.profiles(id),
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'usd',
  campaign text,
  provider text not null default 'stripe',
  provider_payment_id text unique,
  status text not null default 'pending'
    check (status in ('pending', 'succeeded', 'failed', 'refunded')),
  notes text,
  created_at timestamptz not null default now()
);

-- Directory data (member-visible)
create table if not exists public.directory_entries (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  display_name text not null,
  email text,
  phone text,
  household text,
  bio text,
  photo_url text,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Update timestamps trigger function
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

drop trigger if exists ministries_set_updated_at on public.ministries;
create trigger ministries_set_updated_at
before update on public.ministries
for each row execute function public.set_updated_at();

drop trigger if exists directory_entries_set_updated_at on public.directory_entries;
create trigger directory_entries_set_updated_at
before update on public.directory_entries
for each row execute function public.set_updated_at();

-- Auto-create profile for new auth users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'member'
  )
  on conflict (id) do nothing;

  insert into public.directory_entries (profile_id, display_name, email, is_visible)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    true
  )
  on conflict (profile_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Role helper
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.ministries enable row level security;
alter table public.donations enable row level security;
alter table public.directory_entries enable row level security;

-- Profiles policies
drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin"
on public.profiles
for select
using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_self_or_admin" on public.profiles;
create policy "profiles_update_self_or_admin"
on public.profiles
for update
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

-- Events policies
drop policy if exists "events_public_read_published" on public.events;
create policy "events_public_read_published"
on public.events
for select
using (is_published = true or public.is_admin());

drop policy if exists "events_admin_write" on public.events;
create policy "events_admin_write"
on public.events
for all
using (public.is_admin())
with check (public.is_admin());

-- Ministries policies
drop policy if exists "ministries_public_read_published" on public.ministries;
create policy "ministries_public_read_published"
on public.ministries
for select
using (is_published = true or public.is_admin());

drop policy if exists "ministries_admin_write" on public.ministries;
create policy "ministries_admin_write"
on public.ministries
for all
using (public.is_admin())
with check (public.is_admin());

-- Donations policies
drop policy if exists "donations_member_read_own_or_admin" on public.donations;
create policy "donations_member_read_own_or_admin"
on public.donations
for select
using (donor_profile_id = auth.uid() or public.is_admin());

drop policy if exists "donations_member_create_own_or_admin" on public.donations;
create policy "donations_member_create_own_or_admin"
on public.donations
for insert
with check (donor_profile_id = auth.uid() or public.is_admin());

drop policy if exists "donations_admin_update" on public.donations;
create policy "donations_admin_update"
on public.donations
for update
using (public.is_admin())
with check (public.is_admin());

-- Directory policies
drop policy if exists "directory_members_read_visible" on public.directory_entries;
create policy "directory_members_read_visible"
on public.directory_entries
for select
using (
  auth.uid() is not null
  and (
    is_visible = true
    or profile_id = auth.uid()
    or public.is_admin()
  )
);

drop policy if exists "directory_update_self_or_admin" on public.directory_entries;
create policy "directory_update_self_or_admin"
on public.directory_entries
for update
using (profile_id = auth.uid() or public.is_admin())
with check (profile_id = auth.uid() or public.is_admin());

drop policy if exists "directory_insert_self_or_admin" on public.directory_entries;
create policy "directory_insert_self_or_admin"
on public.directory_entries
for insert
with check (profile_id = auth.uid() or public.is_admin());
