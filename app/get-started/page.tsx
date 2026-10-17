import {redirect} from 'next/navigation'
import {getUser} from '@/lib/supabase/server'
export default async function GS({searchParams}:{searchParams:{next?:string}}){const {s,user}=await getUser();if(!user)redirect('/login')
const {data}=await s.from('onboarding_responses').select('id').eq('user_id',user.id).maybeSingle();const n=searchParams.next||'';const ok=n.startsWith('/')&&!n.startsWith('//');redirect(data?(ok?n:'/account'):'/onboarding')}
