-- LEXON AI website: Supabase schema + RLS
-- Run in Supabase SQL editor. Make yourself admin afterwards:
--   update profiles set role='admin' where email='YOUR_EMAIL';

create extension if not exists "pgcrypto";

-- ========== PROFILES ==========
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user','admin')),
  language text not null default 'en',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create function is_admin() returns boolean
language sql security definer stable set search_path = public as
$$ select exists (select 1 from profiles where id = auth.uid() and role = 'admin') $$;

create function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, email, name, avatar_url)
  values (new.id, new.email,
          coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
          new.raw_user_meta_data->>'avatar_url');
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- normal users can never change their own role
create function block_role_change() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.role is distinct from old.role and not is_admin() then
    raise exception 'role change not allowed';
  end if;
  new.updated_at = now();
  return new;
end $$;
create trigger profiles_guard before update on profiles
  for each row execute function block_role_change();

-- ========== CONTENT TABLES ==========
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  thumbnail_url text,
  price numeric(10,2) not null default 0,
  is_free boolean not null default true,
  duration text,
  level text check (level in ('beginner','intermediate','advanced')),
  is_popular boolean default false,
  is_published boolean default false,
  order_index int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table course_lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  description text,
  video_url text,
  order_index int not null default 0,
  created_at timestamptz default now()
);

create table course_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  course_id uuid not null references courses(id) on delete cascade,
  amount numeric(10,2) not null,
  status text not null default 'pending' check (status in ('pending','paid','refunded','failed')),
  payment_ref text,
  purchased_at timestamptz default now(),
  unique (user_id, course_id)
);

create table course_progress (
  user_id uuid references profiles(id) on delete cascade,
  lesson_id uuid references course_lessons(id) on delete cascade,
  completed_at timestamptz default now(),
  primary key (user_id, lesson_id)
);

create table tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  logo_url text,
  external_url text,
  file_url text,
  preview_url text,
  category text,
  status text default 'live',
  is_published boolean default false,
  order_index int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table tool_files (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid not null references tools(id) on delete cascade,
  label text,
  file_url text not null,
  created_at timestamptz default now()
);

create table notices (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  is_active boolean default true,
  order_index int default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz default now()
);

create table social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('youtube','instagram','facebook','x','linkedin')),
  url text not null,
  is_active boolean default true,
  order_index int default 0
);

-- key: 'contact' | 'privacy' | 'terms' | 'about' | 'hero' ...; body per language
create table site_content (
  key text not null,
  lang text not null default 'en',
  title text,
  body text,
  updated_at timestamptz default now(),
  primary key (key, lang)
);

-- ========== USER SUBMISSIONS ==========
create table onboarding_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references profiles(id) on delete cascade,
  name text,
  current_role text,
  past_experience text,
  current_work text,
  future_goals text,
  skills text,
  ai_reason text,
  education text,
  projects text,
  ai_goals text,
  created_at timestamptz default now()
);

create table team_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references profiles(id) on delete cascade,
  name text,
  email text,
  skills text,
  interests text,
  experience text,
  projects text,
  goals text,
  reason text,
  extra text,
  status text not null default 'pending'
    check (status in ('pending','shortlisted','contacted','accepted','rejected')),
  created_at timestamptz default now()
);

-- ========== COURSE ACCESS ==========
create function has_course_access(cid uuid) returns boolean
language sql security definer stable set search_path = public as $$
  select is_admin()
     or exists (select 1 from courses c where c.id = cid and c.is_published and c.is_free and auth.uid() is not null)
     or exists (select 1 from course_purchases p where p.course_id = cid and p.user_id = auth.uid() and p.status = 'paid')
$$;

-- ========== RLS ==========
alter table profiles enable row level security;
alter table courses enable row level security;
alter table course_lessons enable row level security;
alter table course_purchases enable row level security;
alter table course_progress enable row level security;
alter table tools enable row level security;
alter table tool_files enable row level security;
alter table notices enable row level security;
alter table social_links enable row level security;
alter table site_content enable row level security;
alter table onboarding_responses enable row level security;
alter table team_applications enable row level security;

-- profiles
create policy "own profile read" on profiles for select using (id = auth.uid() or is_admin());
create policy "own profile update" on profiles for update using (id = auth.uid() or is_admin());

-- public content: anyone reads published, admin does everything
create policy "courses read" on courses for select using (is_published or is_admin());
create policy "courses admin" on courses for all using (is_admin()) with check (is_admin());

create policy "tools read" on tools for select using (is_published or is_admin());
create policy "tools admin" on tools for all using (is_admin()) with check (is_admin());

create policy "tool_files read" on tool_files for select
  using (exists (select 1 from tools t where t.id = tool_id and t.is_published) or is_admin());
create policy "tool_files admin" on tool_files for all using (is_admin()) with check (is_admin());

create policy "notices read" on notices for select
  using ((is_active and (starts_at is null or starts_at <= now()) and (ends_at is null or ends_at >= now())) or is_admin());
create policy "notices admin" on notices for all using (is_admin()) with check (is_admin());

create policy "social read" on social_links for select using (is_active or is_admin());
create policy "social admin" on social_links for all using (is_admin()) with check (is_admin());

create policy "content read" on site_content for select using (true);
create policy "content admin" on site_content for all using (is_admin()) with check (is_admin());

-- lessons (video URLs) only for users with access
create policy "lessons read" on course_lessons for select using (has_course_access(course_id));
create policy "lessons admin" on course_lessons for all using (is_admin()) with check (is_admin());

-- purchases: users read their own; inserts/updates only via server (service role) or admin
create policy "purchases own read" on course_purchases for select using (user_id = auth.uid() or is_admin());
create policy "purchases admin" on course_purchases for all using (is_admin()) with check (is_admin());

-- progress: only for lessons the user can access
create policy "progress own" on course_progress for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and exists (
    select 1 from course_lessons l where l.id = lesson_id and has_course_access(l.course_id)));

-- onboarding + team applications
create policy "onboarding own" on onboarding_responses for select using (user_id = auth.uid() or is_admin());
create policy "onboarding insert" on onboarding_responses for insert with check (user_id = auth.uid());
create policy "onboarding update" on onboarding_responses for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "team own read" on team_applications for select using (user_id = auth.uid() or is_admin());
create policy "team insert" on team_applications for insert
  with check (user_id = auth.uid() and status = 'pending');
create policy "team admin update" on team_applications for update using (is_admin()) with check (is_admin());
create policy "team admin delete" on team_applications for delete using (is_admin());

-- ========== STORAGE ==========
insert into storage.buckets (id, name, public) values
  ('course-thumbnails','course-thumbnails',true),
  ('tool-logos','tool-logos',true),
  ('tool-files','tool-files',true),
  ('avatars','avatars',true)
on conflict do nothing;

create policy "public read assets" on storage.objects for select
  using (bucket_id in ('course-thumbnails','tool-logos','tool-files','avatars'));
create policy "admin write assets" on storage.objects for all
  using (bucket_id in ('course-thumbnails','tool-logos','tool-files') and is_admin())
  with check (bucket_id in ('course-thumbnails','tool-logos','tool-files') and is_admin());
create policy "own avatar write" on storage.objects for all
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- ========== SEED ==========
insert into notices (message, order_index) values
  ('New AI learning resources are being added to Lexon AI.', 1);
insert into site_content (key, title, body) values
  ('contact','Contact Lexon AI','For partnerships, collaborations, support or general enquiries.'),
  ('privacy','Privacy Policy','Edit from admin.'),
  ('terms','Terms and Conditions','Edit from admin.');

-- Run this ONCE in Supabase SQL editor if you already ran supabase-schema.sql before.
create table if not exists course_parts(
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  title text not null,
  order_index int default 0,
  created_at timestamptz default now());
alter table course_lessons
  add column if not exists part_id uuid references course_parts(id) on delete cascade,
  add column if not exists thumbnail_url text,
  add column if not exists youtube_url text,
  add column if not exists drive_url text;
alter table course_parts enable row level security;
-- part titles are public for published courses; lesson video links stay protected by course_lessons RLS
create policy "parts read" on course_parts for select using (exists(select 1 from courses c where c.id=course_id and c.is_published) or is_admin());
create policy "parts admin" on course_parts for all using (is_admin()) with check (is_admin());
