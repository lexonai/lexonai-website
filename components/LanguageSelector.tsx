'use client'
import {useRouter} from 'next/navigation'
export default function LanguageSelector({value,langs}:{value:string;langs:{code:string;label:string}[]}){const r=useRouter()
return <select aria-label="Language" value={value} className="border border-ink bg-paper min-h-[44px] px-2 font-ui text-[13px]" onChange={e=>{document.cookie=`lang=${e.target.value};path=/;max-age=31536000`;r.refresh()}}>{langs.map(l=><option key={l.code} value={l.code}>{l.label}</option>)}</select>}
