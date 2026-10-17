import {redirect} from 'next/navigation'
import Link from 'next/link'
import {getUser} from '@/lib/supabase/server'
export default async function Account(){const {s,user,isAdmin}=await getUser();if(!user)redirect('/login')
const {data:app}=await s.from('team_applications').select('status').eq('user_id',user.id).maybeSingle()
async function logout(){'use server';await (await import('@/lib/supabase/server')).supabaseServer().auth.signOut();redirect('/')}
return <main className="w-full max-w-[1400px] mx-auto px-5 lg:px-[5vw] py-10"><h1 className="text-6xl font-black">Account</h1><p className="mono my-3">{user.email}</p>
<div className="grid md:grid-cols-2 border border-ink"><div className="p-6 border-b md:border-b-0 md:border-r border-ink"><h3 className="text-2xl">Team</h3><p>{app?`Status: ${app.status}`:'Not applied.'}</p>{!app&&<Link className="underline" href="/team/apply">Apply →</Link>}</div><div className="p-6"><h3 className="text-2xl">Actions</h3>{isAdmin&&<Link className="btn my-2" href="/admin">Admin dashboard</Link>}<form action={logout}><button className="btn btn-ghost">Logout</button></form></div></div></main>}
