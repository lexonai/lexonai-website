import {NextResponse} from 'next/server'
import {supabaseServer} from '@/lib/supabase/server'
export async function GET(req:Request){const u=new URL(req.url);const code=u.searchParams.get('code');if(code)await supabaseServer().auth.exchangeCodeForSession(code)
const n=u.searchParams.get('next')||'';return NextResponse.redirect(new URL('/get-started'+(n.startsWith('/')&&!n.startsWith('//')?'?next='+encodeURIComponent(n):''),u.origin))}
