import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { IconLock, LogoMark } from '../components/Icons'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const token = searchParams.get('token')

  if (!token) {
    return (
      <div className="my-auto w-full py-10 text-center">
        <h1 className="font-display text-[26px] font-semibold tracking-tight">Invalid link</h1>
        <p className="mt-2 text-[13.5px] text-ink-2">
          This password reset link is missing a token. Please request a new one.
        </p>
        <Link to="/forgot-password" className="mt-6 block">
          <Button>Request New Link</Button>
        </Link>
      </div>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || ''}/api/v1/auth/reset-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, newPassword }),
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
        <h1 className="font-display text-[26px] font-semibold tracking-tight">
          {submitted ? 'Password reset!' : 'Set new password'}
        </h1>
        <p className="mt-1.5 text-[13.5px] text-ink-2">
          {submitted
            ? 'Your password has been updated successfully.'
            : 'Choose a strong password for your account.'}
        </p>
      </div>

      {submitted ? (
        <div className="animate-fade-up mt-9" style={{ animationDelay: '0.09s' }}>
          <Link to="/login">
            <Button>Go to Login</Button>
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
            label="New password"
            icon={IconLock}
            type="password"
            placeholder="••••••••"
            required
            minLength={6}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            label="Confirm password"
            icon={IconLock}
            type="password"
            placeholder="••••••••"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" className="mt-2" disabled={submitting}>
            {submitting ? 'Resetting…' : 'Reset Password'}
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
