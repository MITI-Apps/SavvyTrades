import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { IconMail, IconLock, IconCheck, LogoMark } from '../components/Icons'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [remember, setRemember] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)
  const [resendMsg, setResendMsg] = useState('')

  const isUnverified = error.toLowerCase().includes('verify your email')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setResendMsg('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleResendVerification() {
    if (!email) {
      setError('Enter your email above first')
      return
    }
    setResending(true)
    setResendMsg('')
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || ''}/api/v1/auth/resend-verification`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      )
      const data = await res.json()
      setResendMsg(data.message || 'Verification link sent.')
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
        <h1 className="font-display text-[26px] font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1.5 text-[13.5px] text-ink-2">Sign in to continue your trading journal</p>
      </div>
      <form
        className="animate-fade-up mt-9 flex flex-col gap-4"
        style={{ animationDelay: '0.09s' }}
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="rounded-2xl border border-rose/30 bg-rose/10 px-4 py-3 text-[13px] text-rose">
            {error}
            {isUnverified && (
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={resending}
                className="ml-1 font-semibold underline hover:text-rose/80 disabled:opacity-50"
              >
                {resending ? 'Sending…' : 'Resend verification email'}
              </button>
            )}
          </div>
        )}
        {resendMsg && (
          <div className="rounded-2xl border border-blue1/30 bg-blue1/10 px-4 py-3 text-[13px] text-blue1">
            {resendMsg}
          </div>
        )}
        <Input
          label="Email"
          icon={IconMail}
          type="email"
          placeholder="you@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          icon={IconLock}
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setRemember((r) => !r)}
            className="flex items-center gap-2 text-[13px] text-ink-2"
          >
            <span
              className={`flex h-[18px] w-[18px] items-center justify-center rounded-[6px] transition ${
                remember
                  ? 'border border-transparent bg-gradient-to-br from-blue1 to-blue2 text-[#0b0d13]'
                  : 'border-[1.5px] border-border-strong bg-surface-2'
              }`}
            >
              {remember && <IconCheck />}
            </span>
            Remember me
          </button>
          <Link
            to="/forgot-password"
            className="text-[13.5px] font-semibold text-blue1"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="mt-2" disabled={submitting}>
          {submitting ? 'Logging in…' : 'Log In'}
        </Button>
      </form>
      <div className="animate-fade-up mt-7 flex items-center gap-3" style={{ animationDelay: '0.14s' }}>
        <div className="h-px flex-1 bg-border" />
        <span className="text-[11.5px] uppercase tracking-[0.06em] text-ink-3">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="animate-fade-up mt-5" style={{ animationDelay: '0.14s' }}>
        <Button variant="ghost" onClick={() => navigate('/register')}>
          Create Account
        </Button>
      </div>
      <p className="animate-fade-up mt-7 text-center text-[13.5px] text-ink-2" style={{ animationDelay: '0.19s' }}>
        New to SavvyTrade?{' '}
        <Link to="/register" className="font-semibold text-blue1">
          Get started free
        </Link>
      </p>
    </div>
  )
}
