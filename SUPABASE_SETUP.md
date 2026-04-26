# Supabase Setup (Admin + Member Foundation)

## 1) Keep keys safe

- `anon` key can be used in the browser.
- `service_role` key is **server only**. Do not put it in frontend files.
- This repo ignores `js/supabase-config.js` by default.

## 2) Create local frontend config

Use `js/supabase-public-config.js` for production/public config.
It is safe to commit because the anon key is public by design.

Example:

```js
window.SUPABASE_CONFIG = {
  url: "https://your-project-ref.supabase.co",
  anonKey: "your-anon-key",
};
```

## 3) Run SQL schema

1. Open Supabase dashboard -> SQL Editor.
2. Paste and run `supabase/schema.sql`.

This creates:
- `profiles` (with `role` = `admin|member`)
- `events`
- `ministries`
- `donations`
- `directory_entries`
- RLS policies for public/member/admin behavior
- auto profile + directory record creation on sign-up

## 3b) Enable image uploads from admin dashboard

Run `supabase/storage-policies.sql` in Supabase SQL Editor.

This creates a public bucket named `site-images` and policies so:
- everyone can view images
- only authenticated admins can upload/update/delete images

## 4) Make first admin user

1. Sign up a user in Supabase Auth (or your future login page).
2. Run:

```sql
update public.profiles
set role = 'admin'
where id = 'USER_UUID_HERE';
```

## 5) Use client helpers in pages

Add scripts in pages that need auth/data:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="js/supabase-public-config.js"></script>
<script src="js/supabase-client.js"></script>
```

Then call:
- `window.authApi.signIn(email, password)`
- `window.authApi.signOut()`
- `window.authApi.getSession()`
- `window.authApi.getProfile()`

## Next build steps

1. `admin.html` for events + ministries CRUD
2. `member.html` for church directory access/edit
3. secure donation flow with Stripe + server endpoint using `service_role`
