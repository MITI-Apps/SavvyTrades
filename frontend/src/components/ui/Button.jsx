export default function Button({ variant = 'primary', className = '', children, ...rest }) {
  const styles = {
    primary:
      'bg-gradient-to-br from-blue1 to-blue2 text-[#0b0d13] shadow-primary hover:brightness-105',
    ghost: 'border border-border-strong bg-white/[0.07] text-ink hover:bg-white/[0.12]',
  }
  return (
    <button
      className={`block w-full rounded-[18px] px-4 py-4 text-[15.5px] font-bold tracking-wide transition active:scale-[0.97] ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}