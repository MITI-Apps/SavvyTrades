import { Link } from 'react-router-dom'
import { LogoMark } from '../components/Icons'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-page px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-blue1 to-blue2 shadow-[0_14px_30px_-8px_rgba(124,147,255,0.55)]">
        <LogoMark />
      </div>
      <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight">404</h1>
      <p className="mt-2 text-sm text-ink-2">That page doesn't exist.</p>
      <Link
        to="/dashboard"
        className="mt-8 rounded-2xl bg-gradient-to-br from-blue1 to-blue2 px-6 py-3.5 text-sm font-bold text-[#0b0d13] shadow-primary transition hover:brightness-105 active:scale-[0.97]"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}