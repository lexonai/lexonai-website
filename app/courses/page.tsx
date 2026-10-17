import {supabaseServer} from '@/lib/supabase/server'
import CourseCard from '@/components/CourseCard'
import Link from 'next/link'
export const metadata={title:'Courses'}
export default async function Courses({searchParams}:{searchParams:{f?:string}}){const f=searchParams.f||'all';let q=supabaseServer().from('courses').select('*').eq('is_published',true).order('order_index')
if(f==='free')q=q.eq('is_free',true);else if(f==='paid')q=q.eq('is_free',false);else if(f!=='all')q=q.eq('level',f)
const {data}=await q
return <main className="w-full max-w-[1700px] mx-auto px-5 lg:px-[5vw] py-10"><h1 className="text-6xl font-black">Courses</h1>
<div className="flex flex-wrap gap-2 my-6">{['all','free','paid','beginner','intermediate','advanced'].map(x=><Link key={x} href={`/courses?f=${x}`} className={`btn ${x===f?'':'btn-ghost'}`}>{x}</Link>)}</div>
<div className="grid md:grid-cols-3 gap-5">{(data||[]).map((c:any)=><CourseCard key={c.id} c={c}/>)}</div>{!data?.length&&<p>No courses yet.</p>}</main>}
