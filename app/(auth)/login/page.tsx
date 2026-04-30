import LoginForm from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-primary-foreground p-4 md:p-10">
          <div className="w-full max-w-lg">
            <LoginForm className="sm:px-4 sm:py-6 " />
          </div>
        </div>
  )
}
