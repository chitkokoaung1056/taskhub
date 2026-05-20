import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm"

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-primary-foreground p-4 md:p-10">
      <div className="w-full max-w-lg">
        <ForgotPasswordForm className="sm:px-4 sm:py-6" />
      </div>
    </div>
  )
}
