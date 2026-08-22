import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconMail, LogoMark } from '../components/Icons'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || ''}/api/v1/auth/forgot-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
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
        <h1 className="font-display text-[26px] font-semibold tracking-tight">Forgot password?</h1>
        <p className="mt-1.5 text-[13.5px] text-ink-2">
          {submitted
            ? 'Check your email for a password reset link.'
            : 'Enter your email and we\'ll send you a reset link.'}
        </p>
      </div>

      {submitted ? (
        <div className="animate-fade-up mt-9" style={{ animationDelay: '0.09s' }}>
          <div className="rounded-2xl border border-blue1/30 bg-blue1/10 px-4 py-3 text-[13px] text-blue1">
            If an account exists with <strong>{email}</strong>, you'll receive a password reset link shortly.
          </div>
          <Link to="/login" className="mt-6 block">
            <Button variant="ghost" className="mt-6">Back to Login</Button>
          </Link>
        </div>
      ) : (
        <form
          className="animate-fade-up mt-9 flex flex-col gap-4"
          style={{ animationDelay: '0.09s' }}
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="rounded-2xl border border-rose/30 bg-rose/10 px-4 py-3 text-[13px] text-rose">
              {error}
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
          <Button type="submit" className="mt-2" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send Reset Link'}
          </Button>
        </form>
      )}

      <p className="animate-fade-up mt-7 text-center text-[13.5px] text-ink-2" style={{ animationDelay: '0.14s' }}>
        Remember your password?{' '}
        <Link to="/login" className="font-semibold text-blue1">
          Log in
        </Link>
      </p>
    </div>
  )
}
