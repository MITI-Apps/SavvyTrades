import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import {
  IconBell,
  IconChevronRight,
  IconLock,
  IconLogout,
  IconShield,
} from '../components/Icons'

function SettingsItem({ icon: Icon, title, sub, danger = false, onClick, delay = 0 }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="animate-fade-up flex w-full items-center gap-3.5 border-b border-border px-[18px] py-4 text-left transition last:border-b-0 hover:bg-white/[0.02]"
      style={{ animationDelay: `${delay}s` }}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] ${
          danger ? 'bg-rose/10 text-rose' : 'bg-surface-3 text-ink-2'
        }`}
      >
        <Icon width={17} height={17} />
      </span>
      <span className="flex-1">
        <span className="block text-sm font-semibold">{title}</span>
        {sub && <span className="mt-0.5 block text-[11.5px] text-ink-3">{sub}</span>}
      </span>
      <IconChevronRight width={15} height={15} className={danger ? 'text-rose' : 'text-ink-2'} />
    </button>
  )
}

export default function Settings() {
  const navigate = useNavigate()

  return (
    <div>
      <h1 className="animate-fade-up font-display text-[22px] font-semibold">Profile</h1>

      <GlassCard className="animate-fade-up mt-5" style={{ animationDelay: '0.04s' }}>
        <div className="flex items-center gap-3.5 p-[18px]">
          <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br from-blue1 to-blue2 font-display text-[19px] font-bold text-[#0b0d13]">
            AM
          </div>
          <div>
            <div className="text-[15.5px] font-bold">Alex Morgan</div>
            <div className="mt-0.5 text-[12.5px] text-ink-3">alex.morgan@email.com</div>
          </div>
          <IconChevronRight width={16} height={16} className="ml-auto text-ink-2" />
        </div>
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 overflow-hidden" style={{ animationDelay: '0.09s' }}>
        <SettingsItem icon={IconLock} title="Change Password" sub="Update your login credentials" delay={0} />
        <SettingsItem icon={IconBell} title="Notifications" sub="Trade reminders & alerts" delay={0.05} />
        <SettingsItem icon={IconShield} title="Privacy & Security" sub="Manage data & sessions" delay={0.1} />
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 overflow-hidden" style={{ animationDelay: '0.14s' }}>
        <SettingsItem
          icon={IconLogout}
          title="Log Out"
          danger
          onClick={() => navigate('/login')}
        />
      </GlassCard>

      <div
        className="animate-fade-up mt-7 text-center text-[11.5px] text-ink-3"
        style={{ animationDelay: '0.19s' }}
      >
        SavvyTrade v2.4.0
      </div>
    </div>
  )
}