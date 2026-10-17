export default function sitemap(){const b=process.env.NEXT_PUBLIC_SITE_URL||'https://lexonai.com';return ['','/courses','/tools','/about','/contact','/privacy','/terms'].map(p=>({url:b+p}))}
