-- Supabase Storage setup for admin image uploads
-- Run this in Supabase SQL Editor after schema.sql

-- 1) Create public bucket for website images
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

-- 2) Clean existing policies if re-running
drop policy if exists "Public read site-images" on storage.objects;
drop policy if exists "Admin upload site-images" on storage.objects;
drop policy if exists "Admin update site-images" on storage.objects;
drop policy if exists "Admin delete site-images" on storage.objects;

-- 3) Public read access (images can be shown on website)
create policy "Public read site-images"
on storage.objects
for select
using (bucket_id = 'site-images');

-- 4) Admin write access only
create policy "Admin upload site-images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'site-images'
  and public.is_admin()
);

create policy "Admin update site-images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'site-images'
  and public.is_admin()
)
with check (
  bucket_id = 'site-images'
  and public.is_admin()
);

create policy "Admin delete site-images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'site-images'
  and public.is_admin()
);
