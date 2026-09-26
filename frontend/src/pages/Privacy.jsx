import { Link } from 'react-router-dom'
import { LogoMark, IconChevronLeft } from '../components/Icons'

const sections = [
  {
    title: 'Information We Collect',
    body: 'When you use SavvyTrades, we collect the account information you provide — your name, email address, trading account details, starting balances, and the trade records, notes, and screenshots you log. Account details and trade data are stored to power your journal and analytics.',
  },
  {
    title: 'How We Use Your Information',
    body: 'Your data is used exclusively to operate the app: authenticate you, persist your trading journal and accounts, compute the performance statistics shown on your dashboard, and send service-related emails such as verification or password reset messages.',
  },
  {
    title: 'Data Storage & Security',
    body: 'Your password is stored as a strongly-hashed value and is never readable in plain text. Trade journal data is private to your account and is protected behind authenticated, server-side endpoints. We do not sell or rent your personal data to third parties.',
  },
  {
    title: 'Third-Party Services',
    body: 'Screenshots you attach to trades are uploaded and stored via a cloud image service (Cloudinary). Transactional emails are sent through a dedicated email provider. These services process data only for the purposes described in this policy.',
  },
  {
    title: 'Your Rights',
    body: 'You can update your profile name at any time from Settings. To change the email address on your account, or to request deletion of your account and all associated data, contact support and we will action the request.',
  },
  {
    title: 'Contact',
    body: 'Questions about this policy can be directed to support. If this policy is updated, we will post the revised version within the app.',
  },
]

export default function Privacy() {
  return (
    <div className="bg-page-glows min-h-dvh font-sans text-ink antialiased">
      <nav className="sticky top-0 z-50 border-b border-border bg-page/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-blue1 to-blue2">
              <LogoMark />
            </span>
            <span className="font-display text-[15px] font-bold tracking-tight">SavvyTrades</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-2 transition hover:text-ink"
          >
            <IconChevronLeft width={15} height={15} />
            Back to home
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="animate-fade-up font-display text-[32px] font-semibold tracking-tight">Privacy Policy</h1>
        <p className="animate-fade-up mt-2 text-sm text-ink-3" style={{ animationDelay: '0.04s' }}>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>

        <div className="animate-fade-up mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-lg font-semibold">{s.title}</h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{s.body}</p>
            </section>
          ))}
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <p className="text-xs text-ink-3">&copy; {new Date().getFullYear()} SavvyTrades. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="text-xs text-ink-2 transition hover:text-ink">Privacy</Link>
            <Link to="/terms" className="text-xs text-ink-3 transition hover:text-ink">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}