import { Link } from 'react-router-dom'
import { LogoMark, IconChevronLeft } from '../components/Icons'

const sections = [
  {
    title: 'Acceptance of Terms',
    body: 'By creating an account or using SavvyTrades, you agree to these terms. If you do not agree, you may discontinue use of the service at any time.',
  },
  {
    title: 'Account Responsibilities',
    body: 'You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. Notify support immediately if you suspect unauthorized access.',
  },
  {
    title: 'Acceptable Use',
    body: 'You agree not to misuse the service — including attempting to access other users\u2019 data, uploading malicious files, or using the platform for unlawful activity. Automated scraping or abuse of the API beyond normal use is not permitted.',
  },
  {
    title: 'Your Data & Journal',
    body: 'Your trade journal is private to your account. You are solely responsible for the accuracy of the trade records, P/L figures, and screenshots you log. SavvyTrades is a journaling tool and does not provide financial, investment, or trading advice.',
  },
  {
    title: 'Intellectual Property',
    body: 'The SavvyTrades name, branding, and platform design are owned by SavvyTrades and may not be copied or reused without permission.',
  },
  {
    title: 'Service Availability & Liability',
    body: 'The service is provided \u201Cas is\u201d without warranty of any kind. To the maximum extent permitted by law, SavvyTrades is not liable for any indirect, incidental, or consequential damages arising from your use of the service — including any trading decisions made based on its analytics.',
  },
  {
    title: 'Changes to These Terms',
    body: 'We may update these terms from time to time. Continued use of the service after changes are posted constitutes acceptance of the revised terms.',
  },
  {
    title: 'Contact',
    body: 'Questions about these terms can be directed to support.',
  },
]

export default function Terms() {
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
        <h1 className="animate-fade-up font-display text-[32px] font-semibold tracking-tight">Terms of Service</h1>
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
            <Link to="/privacy" className="text-xs text-ink-3 transition hover:text-ink">Privacy</Link>
            <Link to="/terms" className="text-xs text-ink-2 transition hover:text-ink">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}