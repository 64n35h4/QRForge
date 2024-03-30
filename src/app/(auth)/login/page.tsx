import { Metadata } from 'next'
import { UserAuthForm } from '@/components/user-auth'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome
          </h1>
        </div>
        <div id="login-section" className="d-flex justify-content-center">
          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}
