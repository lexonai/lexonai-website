'use client'
import {useEffect,useState} from 'react'
import {STEPS} from '@/lib/learn'
import VideoPlayer from './VideoPlayer'
export default function LearnPlayer({videos}:{videos:Record<number,string>}){
const [i,setI]=useState(0),[pick,setPick]=useState<number|null>(null),[done,setDone]=useState<number[]>([]),[menu,setMenu]=useState(false)
useEffect(()=>{try{const s=JSON.parse(localStorage.getItem('lexon_learn')||'{}');if(s.i!=null)setI(s.i);if(s.done)setDone(s.done)}catch{}},[])
const save=(n:number,d:number[])=>{try{localStorage.setItem('lexon_learn',JSON.stringify({i:n,done:d}))}catch{}}
const st=STEPS[i],v=videos[st.n]||'',isDrive=v.includes('drive.google'),ok=pick===st.ans
const go=(n:number)=>{setI(n);setPick(null);setMenu(false);save(n,done);window.scrollTo({top:0})}
const check=(k:number)=>{setPick(k);if(k===st.ans&&!done.includes(st.n)){const d=[...done,st.n];setDone(d);save(i,d)}}
return <div className="grid lg:grid-cols-[300px_1fr] gap-0 border border-ink">
<aside className="border-b lg:border-b-0 lg:border-r border-ink"><button className="lg:hidden w-full p-4 text-left font-ui font-semibold text-sm uppercase" onClick={()=>setMenu(!menu)} aria-expanded={menu}>Lessons ({done.length}/{STEPS.length}) ▾</button>
<ol className={`${menu?'block':'hidden'} lg:block`}>{STEPS.map((s,k)=><li key={s.n}><button onClick={()=>go(k)} className={`w-full text-left p-4 border-t border-ink flex gap-3 items-center min-h-[44px] ${k===i?'bg-ink text-paper':'hover:bg-muted'}`}><span className="font-mono text-xs">{done.includes(s.n)?'✓':s.n}</span><span className="font-ui text-sm font-semibold">{s.title}<span className="block font-mono text-[10px] opacity-70">{s.level.toUpperCase()}</span></span></button></li>)}</ol></aside>
<section className="p-5 lg:p-8"><p className="mono text-red">STEP 0{st.n} · {st.level.toUpperCase()}</p><h2 className="text-4xl lg:text-5xl font-black my-2">{st.title.toUpperCase()}</h2>
<p className="max-w-2xl my-4">{st.exp}</p>
<div className="flex flex-wrap items-center gap-2 my-6" aria-label="Diagram">{st.visual.map((x,k)=><span key={x} className="flex items-center gap-2"><span className="border border-ink px-4 py-2 font-mono text-xs font-semibold">{x}</span>{k<st.visual.length-1&&<span>→</span>}</span>)}</div>
<div className="border-l-4 border-red pl-4 my-6 max-w-2xl"><b className="font-ui text-xs uppercase tracking-widest">Example</b><p>{st.example}</p></div>
<div className="max-w-xl my-8"><b className="font-ui text-xs uppercase tracking-widest">Checkpoint</b><p className="font-head text-2xl font-bold my-2">{st.q}</p><div className="grid gap-2">{st.opts.map((o,k)=><button key={o} onClick={()=>check(k)} className={`text-left border border-ink p-3 min-h-[44px] ${pick===k?(k===st.ans?'bg-ink text-paper':'border-red text-red'):'hover:bg-muted'}`}>{o}</button>)}</div>{pick!=null&&<p role="status" className="mono mt-2">{ok?'Correct. Well done.':'Not quite. Try another option.'}</p>}</div>
<div className="max-w-3xl my-8"><b className="font-ui text-xs uppercase tracking-widest block mb-2">Video lesson</b><VideoPlayer yt={isDrive?null:v} drive={isDrive?v:null} title={st.title}/></div>
<div className="flex gap-3">{i>0&&<button className="btn btn-ghost" onClick={()=>go(i-1)}>← Previous</button>}{i<STEPS.length-1?<button className="btn btn-red" onClick={()=>go(i+1)}>Next step →</button>:<span className="mono self-center">You reached the last step.</span>}</div></section></div>}
