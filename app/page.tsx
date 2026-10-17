import Link from 'next/link'
import {supabaseServer} from '@/lib/supabase/server'
import CourseCard from '@/components/CourseCard'
import {dict} from '@/lib/i18n'
import {ECO} from '@/lib/ecosystem'
import {GraduationCap,Wrench,Users} from 'lucide-react'
export default async function Home(){const s=supabaseServer();const t=dict()
const [n,c,so]=await Promise.all([s.from('notices').select('message').eq('is_active',true).order('order_index'),s.from('courses').select('*').eq('is_popular',true).eq('is_published',true).order('order_index').limit(3),s.from('social_links').select('*').eq('is_active',true).order('order_index')])
const msg=(n.data||[]).map((m:any)=>m.message).join('   ◆   ')||'No notices today.'
const H='w-full max-w-[1800px] mx-auto px-5 lg:px-[5vw]'
return <main>
<section className="paper relative overflow-hidden border-b border-ink min-h-[560px] lg:min-h-[clamp(520px,31vw,700px)] flex items-center">
<img src="/hero.webp" alt="Hiker with a backpack looking at misty mountains" className="absolute bottom-0 h-full w-auto max-w-none right-[-100vw] lg:right-[-7vw] select-none pointer-events-none" style={{WebkitMaskImage:'linear-gradient(to right,transparent 0%,rgba(0,0,0,.18) 14%,rgba(0,0,0,.5) 30%,rgba(0,0,0,.85) 44%,#000 56%)',maskImage:'linear-gradient(to right,transparent 0%,rgba(0,0,0,.18) 14%,rgba(0,0,0,.5) 30%,rgba(0,0,0,.85) 44%,#000 56%)'}}/>
<div className="absolute inset-0 bg-paper/70 lg:hidden"/>
<div className={`${H} relative z-10 py-14`}><div className="lg:max-w-[56vw]"><div className="flex items-center gap-6 mb-5"><p className="font-mono text-[clamp(11px,.85vw,15px)] text-red tracking-[.14em]">{t.kicker}</p><span className="hidden md:block h-px w-[13vw] bg-ink"/></div>
<h1 className="font-black text-[clamp(48px,6.1vw,128px)] leading-[1] tracking-[-0.02em]">LEXON AI<span className="block text-[.77em] mt-1 leading-none">BUILD YOUR FUTURE</span></h1>
<p className="my-7 max-w-xl text-[clamp(17px,1.3vw,26px)]">{t.lede}</p>
<div className="flex gap-4 flex-wrap"><Link className="btn btn-red !min-h-[clamp(46px,3vw,66px)] !px-[clamp(22px,1.9vw,40px)] !text-[clamp(13px,.95vw,18px)]" href="/learn">{t.learn}</Link><Link className="btn btn-ghost !bg-paper/80 !min-h-[clamp(46px,3vw,66px)] !px-[clamp(22px,1.9vw,40px)] !text-[clamp(13px,.95vw,18px)]" href="/tools">{t.discover} →</Link></div>
<ul className="mt-10 lg:mt-14 flex flex-wrap items-center gap-y-5 text-[clamp(14px,.9vw,18px)] leading-tight">{[[GraduationCap,'Step-by-step','Learning Path'],[Wrench,'Practical','AI Tools'],[Users,'Join a Growing','Community']].map(([I,a,b]:any,i)=><li key={a} className={`flex items-center gap-3 pr-6 mr-6 ${i<2?'sm:border-r border-ink':''}`}><I size={30} strokeWidth={1.4}/><span>{a}<br/>{b}</span></li>)}</ul></div></div>
<p className="absolute right-5 lg:right-[5vw] bottom-3 z-10 font-mono text-[11px] text-neutral-700 bg-paper/80 px-2 hidden lg:block">FIG. 1.1 — THE FUTURE IS BUILT WITH AI.</p></section>
<div className="border-b-4 border-ink bg-muted"><div className={`${H} flex gap-4 items-center min-h-[52px]`}><b className="font-mono text-xs text-red tracking-widest shrink-0">{t.notice}</b><div className="ticker font-ui text-sm"><span>{msg}</span></div></div></div>
<section className={`${H} py-10`}><div className="sh"><h2 className="text-4xl">{t.eco}</h2><span className="mono hidden sm:block">ONE ECOSYSTEM. LEARN. BUILD. CONNECT.</span></div>
<div className="grid md:grid-cols-2 gap-5">{ECO.map((e,i)=><Link key={e.h} href={e.h} className="card"><p className="mono">PRODUCT 0{i+1}</p><h3 className="text-3xl my-2">{e.n}</h3><p className="mono mb-2">{e.d}</p><p>{e.text}</p>{e.note&&<p className="mono mt-3">↔ {e.note}</p>}<span className="inline-block mt-4 font-ui text-xs font-semibold uppercase border-b-2 border-red">Learn more →</span></Link>)}</div></section>
<section className={`${H} py-10`}><div className="sh"><h2 className="text-4xl">{t.popular}</h2><Link href="/courses" className="font-ui text-xs font-semibold uppercase border-b-2 border-red">{t.viewAll}</Link></div>
<div className="grid md:grid-cols-3 gap-5">{(c.data||[]).map((x:any)=><CourseCard key={x.id} c={x}/>)}</div>{!c.data?.length&&<p className="mono">Courses will appear here.</p>}</section>
{!!so.data?.length&&<section className={`${H} py-10`}><div className="sh"><h2 className="text-4xl">{t.connect}</h2></div><div className="flex flex-wrap border border-ink">{so.data.map((l:any)=><a key={l.id} href={l.url} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[140px] p-4 border-r last:border-0 border-ink font-ui font-semibold text-sm hover:bg-ink hover:text-paper capitalize min-h-[44px]">{l.platform} ↗</a>)}</div></section>}
</main>}
