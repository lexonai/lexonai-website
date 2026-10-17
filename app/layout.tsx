import './globals.css'
import {Playfair_Display,Lora,Inter,JetBrains_Mono} from 'next/font/google'
const head=Playfair_Display({subsets:['latin'],weight:['700','900'],variable:'--f-head',display:'swap'})
const body=Lora({subsets:['latin'],weight:['400','500'],variable:'--f-body',display:'swap'})
const ui=Inter({subsets:['latin'],weight:['500','600'],variable:'--f-ui',display:'swap'})
const mono=JetBrains_Mono({subsets:['latin'],weight:['400','500'],variable:'--f-mono',display:'swap'})
import type {Metadata,Viewport} from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SW from '@/components/SW'
import {getLang} from '@/lib/i18n'
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://lexonai.com'),title:{default:'LEXON AI — Build Your Future',template:'%s | LEXON AI'},description:'Learn AI, explore tools and build with the Lexon ecosystem.',openGraph:{title:'LEXON AI',type:'website'},twitter:{card:'summary_large_image'},alternates:{canonical:'/'}}
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover'}
export default function Root({children}:{children:React.ReactNode}){return <html lang={getLang()==="hi"?"hi":"en"} className={`${head.variable} ${body.variable} ${ui.variable} ${mono.variable}`}><body className="min-h-screen flex flex-col"><SW/><Header/><div className="flex-1">{children}</div><Footer/></body></html>}
