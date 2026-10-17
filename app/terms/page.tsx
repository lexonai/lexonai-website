import {supabaseServer} from '@/lib/supabase/server'
export const metadata={title:'Terms and Conditions'}
export default async function P(){const {data}=await supabaseServer().from('site_content').select('title,body').eq('key','terms').eq('lang','en').single()
return <main className="max-w-3xl mx-auto px-5 py-10"><h1 className="text-6xl font-black">{data?.title||'Terms and Conditions'}</h1><div className="mt-6 whitespace-pre-wrap">{data?.body}</div></main>}
