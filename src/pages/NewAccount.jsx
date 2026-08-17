import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import GlassCard from '../components/ui/GlassCard'
import Input from '../components/ui/Input'
import OptionChip from '../components/ui/OptionChip'
import Button from '../components/ui/Button'

const markets = ['Forex', 'Indices', 'Crypto', 'Futures']
const types = ['Prop Firm', 'Personal', 'Demo', 'Managed']

export default function NewAccount() {
  const navigate = useNavigate()
  const [market, setMarket] = useState('Forex')
  const [type, setType] = useState('Prop Firm')

  return (
    <div>
      <div className="animate-fade-up">
        <PageHeader backTo="/accounts" title="New Account" sub="Set up a fresh trading ledger" />
      </div>

      <GlassCard className="animate-fade-up mt-5 p-[18px]" style={{ animationDelay: '0.04s' }}>
        <Input label="Account name" placeholder="e.g. Apex Capital — Live" />
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
          <Input label="Starting balance" placeholder="100,000" />
          <Input label="Currency" placeholder="USD" />
        </div>
      </GlassCard>

      <div className="animate-fade-up mt-7" style={{ animationDelay: '0.24s' }}>
        <Button onClick={() => navigate('/dashboard')}>Save Account</Button>
      </div>
    </div>
  )
}