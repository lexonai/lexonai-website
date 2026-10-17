import Link from 'next/link'
import {getUser} from '@/lib/supabase/server'
import {dict,getLang,LANGS} from '@/lib/i18n'
import {ECO} from '@/lib/ecosystem'
import LanguageSelector from './LanguageSelector'
import GetStartedMenu from './GetStartedMenu'
import NavLink from './NavLink'
export default async function Header(){const {user,isAdmin}=await getUser();const t=dict()
const A='py-3 border-b-2 border-transparent hover:text-red'
return <header className="border-b border-ink sticky top-0 bg-paper z-30"><div className="w-full max-w-[1800px] mx-auto px-5 lg:px-[5vw] grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center min-h-[76px] gap-4">
<Link href="/" className="font-head font-black text-[34px] tracking-[-0.02em]">LEXON AI</Link>
<nav className="hidden md:flex justify-center gap-9 font-ui text-[14px] font-medium uppercase tracking-[.1em]" aria-label="Main">
<NavLink href="/">{t.home}</NavLink><NavLink href="/courses">{t.courses}</NavLink>
<div className="relative group"><Link href="/ecosystem" className={A+' inline-block'} aria-haspopup="true">{t.ecosystem} ▾</Link>
<div className="hidden group-hover:block group-focus-within:block absolute top-full left-1/2 -translate-x-1/2 w-80 border border-ink bg-paper shadow-[4px_4px_0_#111]">
{ECO.map((e,i)=><Link key={e.h} href={e.h} className="block p-4 border-b last:border-0 border-ink hover:bg-muted normal-case tracking-normal"><b className="font-head text-base block">0{i+1} {e.n}</b><span className="text-xs text-neutral-600">{e.d}</span>{e.note&&<span className="block text-xs text-neutral-600">({e.note})</span>}</Link>)}</div></div>
<NavLink href="/tools">{t.tools}</NavLink><NavLink href="/about">{t.about}</NavLink></nav>
<div className="flex justify-end items-center gap-2"><div className="hidden md:flex items-center gap-2"><LanguageSelector value={getLang()} langs={LANGS}/>{isAdmin&&<Link className="btn" href="/admin">Admin</Link>}<GetStartedMenu user={!!user} start={t.start} account={t.account} text={t.journey} login={t.login}/></div>
<details className="md:hidden relative"><summary className="btn list-none" aria-label="Menu">☰</summary>
<div className="absolute right-0 top-full mt-2 w-72 bg-paper border border-ink shadow-[4px_4px_0_#111] p-3 grid gap-1 font-ui text-sm font-semibold uppercase">
{[['/',t.home],['/courses',t.courses],...ECO.map(e=>[e.h,e.n]),['/tools',t.tools],['/about',t.about]].map(([h,l])=><Link key={h+l} href={h} className="py-3 border-b border-ink min-h-[44px]">{l}</Link>)}
{isAdmin&&<Link href="/admin" className="py-3 border-b border-ink">Admin</Link>}<LanguageSelector value={getLang()} langs={LANGS}/><div className="pt-2"><GetStartedMenu user={!!user} start={t.start} account={t.account} text={t.journey} login={t.login}/></div></div></details></div></div></header>}
