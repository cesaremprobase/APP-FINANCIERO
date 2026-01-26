import LoginForm from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 bg-[url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      <div className="relative z-10 w-full">
        <LoginForm />
      </div>
    </div>
  )
}
