import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="bg-auth min-h-dvh font-sans text-ink antialiased">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-6">
        <Outlet />
      </main>
    </div>
  )
}