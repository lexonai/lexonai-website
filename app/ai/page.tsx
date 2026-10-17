import Info from '@/components/Info'
import {supabaseServer} from '@/lib/supabase/server'
export const metadata={title:'Lexon AI App'}
export default async function P(){const {data}=await supabaseServer().from('site_content').select('body').eq('key','app_url').eq('lang','en').maybeSingle()
const url=data?.body?.trim();return <Info tag="PRODUCT 03" title="Lexon AI App" text="A free AI learning application for learning and practicing AI from beginner to advanced. Lexon Academy is part of the app. This website is separate: it hosts courses, tools and the ecosystem." items={['AI learning','Resources','Practice','Tests','Tasks','Learning progress','Team qualification']} cta={url?[{href:url,label:'Open Lexon AI App →'}]:[{href:'/contact',label:'Get app link →'}]}/>}
