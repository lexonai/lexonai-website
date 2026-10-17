'use client'
import {useState} from 'react'
import VideoPlayer from './VideoPlayer'
type L={id:string;title:string;thumbnail_url?:string|null;youtube_url?:string|null;drive_url?:string|null}
type P={id:string;title:string;lessons:L[]}
export default function CoursePlayer({parts}:{parts:P[]}){
const all=parts.flatMap(p=>p.lessons);const [a,setA]=useState<L|undefined>(all[0]);const [open,setOpen]=useState<string[]>(parts[0]?[parts[0].id]:[])
const idx=a?all.findIndex(x=>x.id===a.id):-1,next=all[idx+1]
if(!all.length)return <p className="mono">Lessons will appear here soon.</p>
return <div className="grid lg:grid-cols-[340px_1fr] border border-ink">
<aside className="border-b lg:border-b-0 lg:border-r border-ink">{parts.map((p,pi)=>{const o=open.includes(p.id);return <div key={p.id} className="border-t first:border-0 border-ink">
<button className="w-full flex justify-between p-4 min-h-[44px] font-ui text-sm font-semibold uppercase" aria-expanded={o} onClick={()=>setOpen(o?open.filter(x=>x!==p.id):[...open,p.id])}><span>Part {pi+1} · {p.title}</span><span>{o?'−':'+'}</span></button>
<div className={`grid transition-[grid-template-rows] duration-300 ${o?'grid-rows-[1fr]':'grid-rows-[0fr]'}`}><div className="overflow-hidden">{p.lessons.map((l,li)=><button key={l.id} onClick={()=>setA(l)} className={`w-full flex gap-3 p-3 text-left items-center border-t border-ink ${a?.id===l.id?'bg-ink text-paper':'hover:bg-muted'}`}>
<span className="w-20 h-12 bg-ink/80 shrink-0 overflow-hidden">{l.thumbnail_url&&<img src={l.thumbnail_url} alt="" className="w-full h-full object-cover"/>}</span><span className="text-sm"><span className="font-mono text-[10px] block opacity-70">0{li+1}</span>{l.title}</span></button>)}</div></div></div>})}</aside>
<section className="p-5 lg:p-8">{a&&<><h2 className="text-3xl font-black mb-4">{a.title}</h2><VideoPlayer yt={a.youtube_url} drive={a.drive_url} thumb={a.thumbnail_url} title={a.title}/>{next&&<button className="btn btn-red mt-5" onClick={()=>setA(next)}>Next: {next.title} →</button>}</>}</section></div>}
