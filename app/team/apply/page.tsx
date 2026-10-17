import {redirect} from 'next/navigation'
import {getUser} from '@/lib/supabase/server'
export default async function Apply(){const {s,user}=await getUser();if(!user)redirect('/login')
const {data:ex}=await s.from('team_applications').select('status').eq('user_id',user.id).maybeSingle()
async function submit(f:FormData){'use server';const {s,user}=await getUser();if(!user)return
await s.from('team_applications').insert({user_id:user.id,email:user.email,name:f.get('name'),skills:f.get('skills'),interests:f.get('interests'),experience:f.get('experience'),projects:f.get('projects'),goals:f.get('goals'),reason:f.get('reason'),extra:f.get('extra'),status:'pending'});redirect('/account')}
if(ex)return <main className="max-w-2xl mx-auto px-5 py-10"><h1 className="text-5xl font-black">Application sent</h1><p className="mono mt-3">STATUS: {ex.status.toUpperCase()}</p></main>
return <main className="max-w-2xl mx-auto px-5 py-10"><h1 className="text-5xl font-black">Team application</h1><form action={submit}><label className="lbl">Name</label><input name="name" required className="inp"/><label className="lbl">Email</label><input disabled value={user.email} className="inp"/>
{['skills','interests','experience','projects','goals','reason','extra'].map(k=><div key={k}><label className="lbl">{k==='reason'?'Why do you want to join?':k==='extra'?'Additional information':k}</label><textarea name={k} rows={2} required={k==='reason'} className="inp"/></div>)}<button className="btn btn-red mt-6">Submit application →</button></form></main>}
