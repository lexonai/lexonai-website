export const ytId=(u?:string|null)=>{if(!u)return null;const m=u.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([A-Za-z0-9_-]{11})/);return m?m[1]:null}
export const driveId=(u?:string|null)=>{if(!u)return null;const m=u.match(/\/d\/([A-Za-z0-9_-]+)/)||u.match(/[?&]id=([A-Za-z0-9_-]+)/);return m?m[1]:null}
