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
      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
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
