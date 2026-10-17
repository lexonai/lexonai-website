import Link from 'next/link'
export default function Info({tag,title,text,items,flow,cta}:{tag:string;title:string;text:string;items?:string[];flow?:string[];cta?:{href:string;label:string}[]}){
return <main className="max-w-4xl mx-auto px-5 py-10"><p className="mono">{tag}</p><h1 className="text-6xl font-black my-2">{title}</h1><p className="max-w-xl my-5">{text}</p>
{items&&<ul className="grid sm:grid-cols-2 border border-ink my-6">{items.map(i=><li key={i} className="p-4 border-b border-ink font-ui text-sm font-semibold">+ {i}</li>)}</ul>}
{flow&&<ol className="my-6 font-mono text-sm">{flow.map((f,i)=><li key={f} className="border border-ink -mt-px p-3">{i+1}. {f}</li>)}</ol>}
<div className="flex gap-3 flex-wrap">{cta?.map(c=><Link key={c.href+c.label} className="btn" href={c.href}>{c.label}</Link>)}</div></main>}
