import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import PageHeader from '../components/ui/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import Input from '../components/ui/Input'
import OptionChip from '../components/ui/OptionChip'
import Button from '../components/ui/Button'

const markets = ['Forex', 'Indices', 'Crypto', 'Futures']
const types = ['Prop Firm', 'Personal', 'Demo', 'Managed']

export default function NewAccount() {
  const navigate = useNavigate()
  const [accountName, setAccountName] = useState('')
  const [market, setMarket] = useState('Forex')
  const [type, setType] = useState('Prop Firm')
  const [startingBalance, setStartingBalance] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!accountName.trim()) {
      setError('Account name is required')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const result = await api.post('/trading-accounts', {
        accountName: accountName.trim(),
        market,
        accountType: type,
        startingBalance: startingBalance ? parseFloat(startingBalance) : 0,
        currency: currency.trim().toUpperCase() || 'USD',
      })
      if (result?.account?.id) {
        localStorage.setItem('activeAccountId', result.account.id)
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="animate-fade-up">
        <PageHeader backTo="/accounts" title="New Account" sub="Set up a fresh trading ledger" />
      </div>

      {error && (
        <div className="animate-fade-up mt-4 rounded-2xl border border-rose/30 bg-rose/10 px-4 py-3 text-[13px] text-rose">
          {error}
        </div>
      )}

      <GlassCard className="animate-fade-up mt-5 p-[18px]" style={{ animationDelay: '0.04s' }}>
        <Input
          label="Account name"
          placeholder="e.g. Apex Capital — Live"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 p-[18px]" style={{ animationDelay: '0.09s' }}>
        <span className="mb-2 block text-xs font-semibold tracking-wide text-ink-2">Market</span>
        <div className="mt-2 grid grid-cols-2 gap-2.5">
          {markets.map((m) => (
            <OptionChip key={m} selected={market === m} onClick={() => setMarket(m)}>
              {m}
            </OptionChip>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 p-[18px]" style={{ animationDelay: '0.14s' }}>
        <span className="mb-2 block text-xs font-semibold tracking-wide text-ink-2">
          Account type
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2.5">
          {types.map((t) => (
            <OptionChip key={t} selected={type === t} onClick={() => setType(t)}>
              {t}
            </OptionChip>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 p-[18px]" style={{ animationDelay: '0.19s' }}>
        <div className="grid grid-cols-[1fr_104px] items-end gap-3">
          <Input
            label="Starting balance"
            placeholder="100,000"
            type="number"
            value={startingBalance}
            onChange={(e) => setStartingBalance(e.target.value)}
          />
          <Input
            label="Currency"
            placeholder="USD"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </div>
      </GlassCard>

      <div className="animate-fade-up mt-7" style={{ animationDelay: '0.24s' }}>
        <Button onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Saving…' : 'Save Account'}
        </Button>
      </div>
    </div>
  )
}
