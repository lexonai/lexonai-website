export default function robots(){return {rules:{userAgent:'*',allow:'/',disallow:['/admin','/account']},sitemap:`${process.env.NEXT_PUBLIC_SITE_URL||'https://lexonai.com'}/sitemap.xml`}}
