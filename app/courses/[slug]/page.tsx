import {notFound} from 'next/navigation'
import Link from 'next/link'
import {getUser} from '@/lib/supabase/server'
import {dict} from '@/lib/i18n'
import CoursePlayer from '@/components/CoursePlayer'
export default async function Course({params}:{params:{slug:string}}){const {s,user}=await getUser();const t=dict()
const {data:c}=await s.from('courses').select('*').eq('slug',params.slug).eq('is_published',true).single();if(!c)notFound()
const {data:parts}=await s.from('course_parts').select('*').eq('course_id',c.id).order('order_index')
// RLS: lessons (video links) are returned only when the user has access (free+login, paid grant, admin)
const {data:lessons}=await s.from('course_lessons').select('*').eq('course_id',c.id).order('order_index')
const access=user?!!(await s.rpc('has_course_access',{cid:c.id})).data:false
const tree=(parts||[]).map((p:any)=>({id:p.id,title:p.title,lessons:(lessons||[]).filter((l:any)=>l.part_id===p.id)}))
const H='w-full max-w-[1700px] mx-auto px-5 lg:px-[5vw] py-10'
return <main className={H}><span className={`px-2 font-mono text-xs text-white ${c.is_free?'bg-red':'bg-ink'}`}>{c.is_free?'FREE':'PAID'}</span><h1 className="text-5xl font-black my-3">{c.title}</h1><p className="max-w-2xl">{c.description}</p>
<p className="mono my-3">LEVEL: {c.level?.toUpperCase()} · DURATION: {c.duration}</p>
{!user&&<div className="border-4 border-ink p-5 my-6 max-w-lg"><b>{t.loginReq}</b><p className="my-2">{t.loginMsg}</p><Link className="btn btn-red" href={`/login?next=/courses/${c.slug}`}>{t.login}</Link></div>}
{user&&!access&&<div className="border-4 border-ink p-5 my-6 max-w-lg"><b>{t.locked}</b><p className="my-2">{t.lockedMsg}</p></div>}
{access?<CoursePlayer parts={tree}/>:<div className="mt-6"><div className="sh"><h2 className="text-3xl">Course structure</h2></div>{tree.map((p:any,i:number)=><div key={p.id} className="border border-ink -mt-px p-4 font-ui font-semibold text-sm uppercase">Part {i+1} · {p.title} <span className="mono float-right">LOCKED</span></div>)}</div>}</main>}
