# LEXON AI website (Next.js 14 + Supabase)
1. Supabase: new project, run `supabase-schema.sql` in the SQL editor.
2. Auth > Providers: enable Google and Email. Add `http://localhost:3000/auth/callback` and your domain callback to redirect URLs.
3. `cp .env.example .env.local` and fill URL + anon key.
4. `npm install && npm run dev`
5. Login once, then in SQL: `update profiles set role='admin' where email='you@example.com';`
## Added
Lesson editor, image/file uploads (Storage), publish/popular/active toggles, notice scheduling, manual course access (Admin > Access), Hindi/Hinglish (lib/i18n.ts), info pages, PWA (manifest + sw.js).
Admin > Content > `app_url`: paste the Lexon AI App URL in the body field to enable the Open button on /ai.
## Not included
Online payment. Paid courses are unlocked manually from Admin > Access. When you add payments, mark course_purchases 'paid' only from a verified webhook.

## Blueprint update (v2)
- If you already ran supabase-schema.sql earlier, run `migration-v2.sql` once. Fresh installs: schema file already includes it.
- Replace `public/hero.jpg` with your high-quality hero image (same name).
- Learning videos for /learn: Admin > Content > learn_video_1 ... learn_video_7 (paste a YouTube or Google Drive link in body).
- Course videos: Admin > Courses (YouTube/Drive link creates Part 1) or Admin > Lessons for Parts and lessons. Google Drive files must be shared as "Anyone with the link".
