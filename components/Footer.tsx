import Link from 'next/link'
import {dict} from '@/lib/i18n'
export default function Footer(){const t=dict();return <footer className="bg-ink text-paper py-8 text-center"><nav className="flex justify-center gap-8 font-ui text-xs font-semibold uppercase tracking-widest flex-wrap">
<Link href="/contact">{t.contact}</Link><Link href="/privacy">{t.privacy}</Link><Link href="/terms">{t.terms}</Link></nav><p className="font-mono text-xs text-neutral-400 mt-3">© 2026 LEXON AI</p></footer>}
