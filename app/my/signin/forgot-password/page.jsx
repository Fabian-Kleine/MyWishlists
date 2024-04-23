import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm"

export default function ForgotPassword() {
    return (
        <>
            <div className="text-center">
                <h1 className="text-5xl font-bold">Recover Password</h1>
                <p className="py-6">Enter your email address to recover your password</p>
            </div>
            <div className="card shrink-0 w-full max-w-xs shadow-2xl bg-base-100">
                <ForgotPasswordForm />
            </div>
        </>
    )
}