import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { LogoMark, IconMail } from '../components/Icons'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')
  const [resending, setResending] = useState(false)
  const [resendMsg, setResendMsg] = useState('')
  const [resendEmail, setResendEmail] = useState('')

  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('No verification token provided.')
      return
    }

    fetch(`${import.meta.env.VITE_API_URL || ''}/api/v1/auth/verify-email?token=${token}`)
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Verification failed')
        setStatus('success')
        setMessage(data.message)
      })
      .catch((err) => {
        setStatus('error')
        setMessage(err.message || 'Failed to verify email. The link may have expired.')
      })
  }, [searchParams])

  async function handleResendVerification(e) {
    e.preventDefault()
    if (!resendEmail) return
    setResending(true)
    setResendMsg('')
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || ''}/api/v1/auth/resend-verification`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: resendEmail }),
        }
      )
      const data = await res.json()
      setResendMsg(data.message || 'Verification link sent. Check your inbox.')
    } catch {
      setResendMsg('Failed to resend. Please try again.')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="my-auto w-full py-10">
      <div className="animate-fade-up flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-br from-blue1 to-blue2 shadow-[0_14px_30px_-8px_rgba(124,147,255,0.55)]">
          <LogoMark />
        </div>
      </div>
      <div className="animate-fade-up mt-6 text-center" style={{ animationDelay: '0.04s' }}>
        <h1 className="font-display text-[26px] font-semibold tracking-tight">
          {status === 'loading' && 'Verifying your email…'}
          {status === 'success' && 'Email verified!'}
          {status === 'error' && 'Verification failed'}
        </h1>
        <p className="mt-2 text-[13.5px] text-ink-2">{message}</p>
      </div>
      {status !== 'loading' && (
        <div className="animate-fade-up mt-9 flex flex-col items-center gap-3" style={{ animationDelay: '0.09s' }}>
          {status === 'error' && (
            <form onSubmit={handleResendVerification} className="w-full max-w-sm flex flex-col gap-3">
              <Input
                label="Email"
                icon={IconMail}
                type="email"
                placeholder="you@email.com"
                required
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
              />
              <Button type="submit" disabled={resending} className="w-full">
                {resending ? 'Sending…' : 'Resend Verification Email'}
              </Button>
              {resendMsg && (
                <div className="rounded-2xl border border-blue1/30 bg-blue1/10 px-4 py-3 text-[13px] text-blue1">
                  {resendMsg}
                </div>
              )}
            </form>
          )}
          <Link to="/login">
            <Button variant="ghost">Go to Login</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
