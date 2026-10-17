import {createServerClient} from '@supabase/ssr'
import {NextResponse,type NextRequest} from 'next/server'
export async function middleware(req:NextRequest){let res=NextResponse.next({request:req})
const s=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:{getAll:()=>req.cookies.getAll(),setAll:l=>{l.forEach(({name,value})=>req.cookies.set(name,value));res=NextResponse.next({request:req});l.forEach(({name,value,options})=>res.cookies.set(name,value,options))}}})
const {data:{user}}=await s.auth.getUser()
const p=req.nextUrl.pathname
if(!user&&(p.startsWith('/admin')||p.startsWith('/onboarding')||p.startsWith('/team/apply')))return NextResponse.redirect(new URL('/login?next='+encodeURIComponent(p),req.url))
return res}
export const config={matcher:['/((?!_next|favicon.ico|.*\\..*).*)']}
