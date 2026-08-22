import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { IconMail, IconLock, IconUser } from '../components/Icons'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [registered, setRegistered] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setSubmitting(true)
    try {
      await register(name, email, password)
      setRegistered(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (registered) {
    return (
      <div className="my-auto w-full py-10 text-center">
        <div className="animate-fade-up" style={{ animationDelay: '0.04s' }}>
          <h1 className="font-display text-[26px] font-semibold tracking-tight">
            Check your email
          </h1>
          <p className="mt-2 text-[13.5px] text-ink-2">
            We've sent a verification link to <strong className="text-ink">{email}</strong>.
            Click the link in the email to verify your account.
          </p>
        </div>
        <div className="animate-fade-up rounded-2xl border border-blue1/30 bg-blue1/10 px-4 py-3 text-[13px] text-blue1" style={{ animationDelay: '0.09s' }}>
          Didn't get the email? Check your spam folder or try logging in — you can resend the verification from there.
        </div>
        <div className="animate-fade-up mt-9" style={{ animationDelay: '0.14s' }}>
          <Link to="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="my-auto w-full py-10">
      <div className="animate-fade-up text-center" style={{ animationDelay: '0.04s' }}>
        <h1 className="font-display text-[26px] font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="mt-1.5 text-[13.5px] text-ink-2">
          Start journaling trades in under a minute
        </p>
      </div>
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
          label="Full name"
          icon={IconUser}
          placeholder="Alex Morgan"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          label="Confirm password"
          icon={IconLock}
          type="password"
          placeholder="••••••••"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" className="mt-2" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create Account'}
        </Button>
      </form>
      <p className="animate-fade-up mt-7 text-center text-[13.5px] text-ink-2" style={{ animationDelay: '0.14s' }}>
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-blue1">
          Log in
        </Link>
      </p>
    </div>
  )
}
