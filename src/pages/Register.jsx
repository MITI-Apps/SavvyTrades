import { Link, useNavigate } from 'react-router-dom'
import { IconMail, IconLock, IconUser } from '../components/Icons'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Register() {
  const navigate = useNavigate()

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
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/new-account')
        }}
      >
        <Input label="Full name" icon={IconUser} placeholder="Alex Morgan" required />
        <Input label="Email" icon={IconMail} type="email" placeholder="you@email.com" required />
        <Input
          label="Password"
          icon={IconLock}
          type="password"
          placeholder="••••••••"
          required
        />
        <Input
          label="Confirm password"
          icon={IconLock}
          type="password"
          placeholder="••••••••"
          required
        />
        <Button type="submit" className="mt-2">
          Create Account
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