'use client'
import {driveId,ytId} from '@/lib/video'
export default function VideoPlayer({yt,drive,thumb,title}:{yt?:string|null;drive?:string|null;thumb?:string|null;title:string}){
const d=driveId(drive),y=ytId(yt)
if(d)return <div><div className="aspect-video bg-ink w-full"><iframe title={title} src={`https://drive.google.com/file/d/${d}/preview`} allow="autoplay; fullscreen" allowFullScreen className="w-full h-full border-0"/></div>
<p className="mono mt-2">Video not playing? In Google Drive set sharing to "Anyone with the link", or <a className="underline" target="_blank" rel="noopener noreferrer" href={`https://drive.google.com/file/d/${d}/view`}>open in Drive</a>.</p></div>
if(y)return <a href={`https://www.youtube.com/watch?v=${y}`} target="_blank" rel="noopener noreferrer" className="block relative aspect-video bg-ink group" aria-label={`Watch ${title} on YouTube`}>
<img src={thumb||`https://img.youtube.com/vi/${y}/hqdefault.jpg`} alt="" className="w-full h-full object-cover opacity-80"/><span className="absolute inset-0 flex flex-col items-center justify-center text-white"><span className="bg-red w-16 h-16 flex items-center justify-center text-2xl">▶</span><span className="font-ui text-xs font-semibold uppercase tracking-widest mt-3">Watch on YouTube (opens app or browser)</span></span></a>
return <div className="aspect-video border border-ink flex items-center justify-center mono">Video coming soon</div>}
