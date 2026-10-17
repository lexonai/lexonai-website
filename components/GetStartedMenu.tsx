'use client'
import Link from 'next/link'
import {useState} from 'react'
export default function GetStartedMenu({user,start,account,text,login}:{user:boolean;start:string;account:string;text:string;login:string}){const [o,setO]=useState(false)
if(user)return <Link className="btn btn-ghost" href="/account">{account}</Link>
return <div className="relative"><button className="btn" aria-expanded={o} onClick={()=>setO(!o)}>{start} ▾</button>
{o&&<div className="absolute right-0 top-full mt-2 w-64 bg-paper border border-ink p-4 shadow-[4px_4px_0_#111] z-40"><p className="text-sm mb-3">{text}</p><Link href="/login" className="btn btn-red w-full" onClick={()=>setO(false)}>{login}</Link></div>}</div>}
