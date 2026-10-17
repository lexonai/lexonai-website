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
