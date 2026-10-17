'use client'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
export default function NavLink({href,children}:{href:string;children:React.ReactNode}){const p=usePathname();const on=href==='/'?p==='/':p.startsWith(href)
return <Link href={href} className={`py-3 border-b-2 ${on?'border-red':'border-transparent hover:text-red'}`} aria-current={on?'page':undefined}>{children}</Link>}
