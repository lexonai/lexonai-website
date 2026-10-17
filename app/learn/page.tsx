import Link from 'next/link'
import {getUser} from '@/lib/supabase/server'
import {dict} from '@/lib/i18n'
import LearnPlayer from '@/components/LearnPlayer'
export const metadata={title:'Start Learning'}
export default async function Learn(){const {s,user}=await getUser();const t=dict()
const H='w-full max-w-[1800px] mx-auto px-5 lg:px-[5vw] py-10'
if(!user)return <main className={H}><p className="mono">LEARNING</p><h1 className="text-6xl font-black my-3">Learn AI, step by step</h1><p className="max-w-xl mb-6">From beginner to advanced: explanation, visuals, examples, checkpoints and video lessons.</p><div className="border-4 border-ink p-6 max-w-md"><b>{t.loginReq}</b><p className="my-2">{t.journey}</p><Link className="btn btn-red" href="/login?next=/learn">{t.login}</Link></div></main>
const {data}=await s.from('site_content').select('key,body').like('key','learn_video_%').eq('lang','en')
const videos:Record<number,string>={};(data||[]).forEach((r:any)=>{videos[Number(r.key.replace('learn_video_',''))]=r.body?.trim()||''})
return <main className={H}><p className="mono">LEARNING · BEGINNER → ADVANCED</p><h1 className="text-5xl font-black my-2 mb-6">Start learning AI</h1><LearnPlayer videos={videos}/></main>}
