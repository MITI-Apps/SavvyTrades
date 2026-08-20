export default function GlassCard({ className = '', children, ...rest }) {
  return (
    <div
      className={`rounded-[24px] border border-border bg-gradient-to-b from-white/[0.07] to-white/[0.045] shadow-soft backdrop-blur-[20px] ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}