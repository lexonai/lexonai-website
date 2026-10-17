'use client'
import {useState} from 'react'
import {supabaseBrowser} from '@/lib/supabase/client'
export default function Login(){const sb=supabaseBrowser();const [mode,setMode]=useState<'in'|'up'>('in');const [msg,setMsg]=useState('')
const nx=()=>{const n=new URLSearchParams(location.search).get('next')||'';return n.startsWith('/')&&!n.startsWith('//')?n:''}
const google=()=>sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:`${location.origin}/auth/callback?next=${encodeURIComponent(nx())}`}})
async function email(e:React.FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget);const [em,pw]=[f.get('email') as string,f.get('password') as string]
const r=mode==='in'?await sb.auth.signInWithPassword({email:em,password:pw}):await sb.auth.signUp({email:em,password:pw,options:{emailRedirectTo:`${location.origin}/auth/callback?next=${encodeURIComponent(nx())}`}})
if(r.error)return setMsg(r.error.message);if(mode==='up'&&!r.data.session)return setMsg('Check your email to confirm your account.');location.href='/get-started?next='+encodeURIComponent(nx())}
return <main className="max-w-md mx-auto px-5 py-12"><h1 className="text-5xl font-black">Get started</h1><p className="my-3">Login to start your AI journey.</p>
<button onClick={google} className="btn w-full">Continue with Google</button><form onSubmit={email} className="mt-6"><label className="lbl" htmlFor="e">Email</label><input id="e" name="email" type="email" required className="inp"/><label className="lbl" htmlFor="p">Password</label><input id="p" name="password" type="password" minLength={6} required className="inp"/>
<button className="btn btn-ghost w-full mt-4">{mode==='in'?'Continue with email':'Create account'}</button></form>
<button className="mono mt-3 underline" onClick={()=>setMode(mode==='in'?'up':'in')}>{mode==='in'?'New here? Create account':'Have an account? Login'}</button>{msg&&<p role="alert" className="mt-3 text-red">{msg}</p>}</main>}
