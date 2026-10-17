import {notFound} from 'next/navigation'
import {supabaseServer} from '@/lib/supabase/server'
export default async function Tool({params}:{params:{slug:string}}){const s=supabaseServer()
const {data:t}=await s.from('tools').select('*').eq('slug',params.slug).eq('is_published',true).single();if(!t)notFound()
const {data:files}=await s.from('tool_files').select('*').eq('tool_id',t.id)
return <main className="w-full max-w-[1400px] mx-auto px-5 lg:px-[5vw] py-10"><h1 className="text-6xl font-black">{t.name}</h1>{t.logo_url&&<img src={t.logo_url} alt="" className="h-20 my-4"/>}<p className="my-4 max-w-xl">{t.description}</p>
<div className="flex gap-3 flex-wrap">{t.external_url&&<a className="btn btn-red" href={t.external_url} target="_blank" rel="noopener noreferrer">Open official tool →</a>}{t.file_url&&<a className="btn" href={t.file_url} download>Download</a>}{files?.map((f:any)=><a key={f.id} className="btn btn-ghost" href={f.file_url}>{f.label||'View file'}</a>)}</div></main>}
