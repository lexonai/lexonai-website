import Link from 'next/link'
export default function CourseCard({c}:{c:any}){return <Link href={`/courses/${c.slug}`} className="card !p-0 flex flex-col overflow-hidden">
<div className="h-44 bg-ink relative border-b border-ink">{c.thumbnail_url?<img src={c.thumbnail_url} alt="" className="w-full h-full object-cover"/>:<div className="w-full h-full" style={{background:'radial-gradient(circle,#F9F9F7 1px,transparent 1.6px) 0 0/8px 8px',opacity:.35}}/>}
<span className={`absolute left-3 bottom-3 px-2 font-mono text-[11px] text-white ${c.is_free?'bg-red':'bg-ink border border-paper'}`}>{c.is_free?'FREE':'PAID'}</span></div>
<div className="p-5 flex flex-col gap-2 flex-1"><h3 className="text-xl">{c.title}</h3><p className="text-sm">{c.description}</p><p className="mono mt-auto">{c.duration} · {c.level?.toUpperCase()}</p></div></Link>}
