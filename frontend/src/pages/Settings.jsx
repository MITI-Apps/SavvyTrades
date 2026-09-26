import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { api } from '../lib/api'
import GlassCard from '../components/ui/GlassCard'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import {
  IconBell,
  IconChevronRight,
  IconLock,
  IconLogout,
  IconShield,
  IconUser,
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

function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm rounded-3xl border border-border bg-surface p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default function Settings() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [showProfile, setShowProfile] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [profileName, setProfileName] = useState(user?.name || '')
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileMsg, setProfileMsg] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordMsg, setPasswordMsg] = useState('')

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '??'

  function handleLogout() {
    logout()
    navigate('/login')
  }

  async function handleSaveProfile() {
    if (!profileName.trim()) {
      setProfileMsg('Name is required')
      return
    }
    setProfileSaving(true)
    setProfileMsg('')
    try {
      await api.put('/auth/update-profile', {
        name: profileName.trim(),
      })
      setProfileMsg('Profile updated successfully!')
      setTimeout(() => {
        setShowProfile(false)
        setProfileMsg('')
        window.location.reload()
      }, 1000)
    } catch (err) {
      setProfileMsg(err.message)
    } finally {
      setProfileSaving(false)
    }
  }

  async function handleChangePassword() {
    if (!currentPassword || !newPassword) {
      setPasswordMsg('Please fill in all fields')
      return
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordMsg('New passwords do not match')
      return
    }
    if (newPassword.length < 6) {
      setPasswordMsg('New password must be at least 6 characters')
      return
    }
    setPasswordSaving(true)
    setPasswordMsg('')
    try {
      await api.put('/auth/change-password', {
        currentPassword,
        newPassword,
      })
      setPasswordMsg('Password changed successfully!')
      setTimeout(() => {
        setShowPassword(false)
        setPasswordMsg('')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
      }, 1000)
    } catch (err) {
      setPasswordMsg(err.message)
    } finally {
      setPasswordSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="animate-fade-up font-display text-[22px] font-semibold lg:mt-0">Profile</h1>

      <GlassCard
        className="animate-fade-up mt-5 cursor-pointer"
        style={{ animationDelay: '0.04s' }}
        onClick={() => {
          setProfileName(user?.name || '')
          setProfileMsg('')
          setShowProfile(true)
        }}
      >
        <div className="flex items-center gap-3.5 p-[18px]">
          <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br from-blue1 to-blue2 font-display text-[19px] font-bold text-[#0b0d13]">
            {initials}
          </div>
          <div>
            <div className="text-[15.5px] font-bold">{user?.name || 'Unknown'}</div>
            <div className="mt-0.5 text-[12.5px] text-ink-3">{user?.email || ''}</div>
          </div>
          <IconChevronRight width={16} height={16} className="ml-auto text-ink-2" />
        </div>
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 overflow-hidden" style={{ animationDelay: '0.09s' }}>
        <SettingsItem
          icon={IconLock}
          title="Change Password"
          sub="Update your login credentials"
          onClick={() => {
            setCurrentPassword('')
            setNewPassword('')
            setConfirmNewPassword('')
            setPasswordMsg('')
            setShowPassword(true)
          }}
          delay={0}
        />
        <SettingsItem
          icon={IconBell}
          title="Notifications"
          sub="Trade reminders & alerts"
          delay={0.05}
          onClick={() => setShowNotifications(true)}
        />
        <SettingsItem
          icon={IconShield}
          title="Privacy & Security"
          sub="Manage data & sessions"
          delay={0.1}
          onClick={() => setShowPrivacy(true)}
        />
      </GlassCard>

      <GlassCard className="animate-fade-up mt-4 overflow-hidden" style={{ animationDelay: '0.14s' }}>
        <SettingsItem
          icon={IconLogout}
          title="Log Out"
          danger
          onClick={handleLogout}
        />
      </GlassCard>

      <div
        className="animate-fade-up mt-7 text-center text-[11.5px] text-ink-3"
        style={{ animationDelay: '0.19s' }}
      >
        SavvyTrades v2.4.0
      </div>

      <Modal open={showProfile} onClose={() => setShowProfile(false)} title="Edit Profile">
        <div className="mt-5 flex flex-col gap-4">
          <Input
            label="Name"
            icon={IconUser}
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
          />
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium text-ink-2">Email</label>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-4 py-3 text-[13.5px] text-ink-3">
              <IconUser width={16} height={16} className="shrink-0 text-ink-3" />
              <span className="truncate">{user?.email || ''}</span>
            </div>
            <p className="mt-1.5 text-[11.5px] text-ink-3">Contact support to change your email</p>
          </div>
          {profileMsg && (
            <p className={`text-[13px] ${profileMsg.includes('success') ? 'text-mint' : 'text-rose'}`}>
              {profileMsg}
            </p>
          )}
          <Button onClick={handleSaveProfile} disabled={profileSaving}>
            {profileSaving ? 'Saving…' : 'Save Profile'}
          </Button>
        </div>
      </Modal>

      <Modal open={showPassword} onClose={() => setShowPassword(false)} title="Change Password">
        <div className="mt-5 flex flex-col gap-4">
          <Input
            label="Current password"
            icon={IconLock}
            type="password"
            placeholder="••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            label="New password"
            icon={IconLock}
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            label="Confirm new password"
            icon={IconLock}
            type="password"
            placeholder="••••••••"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          {passwordMsg && (
            <p className={`text-[13px] ${passwordMsg.includes('success') ? 'text-mint' : 'text-rose'}`}>
              {passwordMsg}
            </p>
          )}
          <Button onClick={handleChangePassword} disabled={passwordSaving}>
            {passwordSaving ? 'Changing…' : 'Change Password'}
          </Button>
        </div>
      </Modal>

      <Modal open={showNotifications} onClose={() => setShowNotifications(false)} title="Notifications">
        <div className="mt-5 flex flex-col gap-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-3 text-ink-2 mx-auto">
            <IconBell width={22} height={22} />
          </span>
          <p className="text-[13.5px] leading-relaxed text-ink-2">
            Notifications are not available yet. Trade reminders, alerts, and summaries are coming soon.
          </p>
          <Button onClick={() => setShowNotifications(false)}>Got it</Button>
        </div>
      </Modal>

      <Modal open={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy & Security">
        <div className="mt-5 space-y-5 text-[13.5px] leading-relaxed text-ink-2">
          <div>
            <div className="text-sm font-semibold text-ink">Account data</div>
            <p className="mt-1">
              Your journal, screenshots, and account details are private to you and never shared with third parties.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-ink">Email address</div>
            <p className="mt-1">
              Your email is used only for verification and password resets. Contact support to change it.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-ink">Sessions</div>
            <p className="mt-1">
              You'll stay signed in on this device until you log out. Log out of unused devices for added security.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-ink">Data deletion</div>
            <p className="mt-1">
              Deleting an account removes all associated accounts, trades, and screenshots. Contact support to erase your data entirely.
            </p>
          </div>
          <Link to="/privacy" onClick={() => setShowPrivacy(false)}>
            <span className="text-[13px] font-semibold text-blue1">Read the full Privacy Policy →</span>
          </Link>
        </div>
      </Modal>
    </div>
  )
}
