import Link from 'next/link'
import {ECO} from '@/lib/ecosystem'
export const metadata={title:'Lexon Ecosystem'}
export default function P(){return <main className="w-full max-w-[1700px] mx-auto px-5 lg:px-[5vw] py-10"><h1 className="text-6xl font-black">ONE ECOSYSTEM.<br/>LEARN. BUILD. CONNECT.</h1><p className="my-5 max-w-xl">Learn with Lexon AI and connect through Lexon Team.</p>
<div className="grid md:grid-cols-2 gap-5">{ECO.map((e,i)=><Link key={e.h} href={e.h} className="card"><p className="mono">PRODUCT 0{i+1}</p><h3 className="text-3xl my-2">{e.n}</h3><p className="mono">{e.d}</p>{e.note&&<p className="mono mt-2">↔ {e.note}</p>}<p className="mt-3">{e.text}</p></Link>)}</div></main>}
