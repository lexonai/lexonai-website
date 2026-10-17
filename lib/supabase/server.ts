import {createServerClient} from '@supabase/ssr'
import {cookies} from 'next/headers'
export function supabaseServer(){const c=cookies()
return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:{getAll:()=>c.getAll(),setAll:(l)=>{try{l.forEach(({name,value,options})=>c.set(name,value,options))}catch{}}}})}
export async function getUser(){const s=supabaseServer();const {data:{user}}=await s.auth.getUser();if(!user)return {s,user:null,isAdmin:false}
const {data:p}=await s.from('profiles').select('role,name').eq('id',user.id).single();return {s,user,isAdmin:p?.role==='admin',profile:p}}
