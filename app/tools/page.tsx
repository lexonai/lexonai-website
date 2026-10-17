import Link from 'next/link'
import {getUser} from '@/lib/supabase/server'
export const metadata={title:'Tools'}
export default async function Tools(){const {s,isAdmin}=await getUser();const {data}=await s.from('tools').select('*').eq('is_published',true).order('order_index')
return <main className="w-full max-w-[1700px] mx-auto px-5 lg:px-[5vw] py-10"><div className="sh"><h1 className="text-6xl font-black">Tools</h1>{isAdmin&&<Link className="btn" href="/admin?t=tools">+ Add tool</Link>}</div>
{data?.length?<div className="grid md:grid-cols-3 gap-5">{data.map((t:any)=><Link key={t.id} href={`/tools/${t.slug}`} className="card"><span className="bg-ink text-paper px-2 font-mono text-xs">{t.name.split(' ').map((w:string)=>w[0]).join('').slice(0,2)}</span><h3 className="text-2xl my-2">{t.name}</h3><p>{t.description}</p><span className="font-ui text-xs font-semibold uppercase border-b-2 border-red">Open tool →</span></Link>)}</div>:<p>New tools are being prepared.<br/>Check back soon.</p>}</main>}
