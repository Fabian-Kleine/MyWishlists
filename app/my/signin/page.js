import SignUpForm from "@/components/forms/SignUpForm";
import SignInForm from "@/components/forms/SignInForm";
import CheckLoggedIn from "@/utils/checkLoggedIn";
import { CircleCheckBig, CircleAlert } from "lucide-react";

export default async function Signin({ searchParams }) {
    const signoutMsg = searchParams.signout == 1;
    const unauthorizedMsg = searchParams.unauthorized == 1;

    return (
        <main className="flex min-h-screen bg-hero-img bg-hero flex-col items-center justify-center signin:px-24">
            <div className="hero w-full flex justify-evenly flex-col lg:flex-row items-start">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Sign in</h1>
                        <p className="py-6">Sign in to create and manage your wishlists</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-xs shadow-2xl bg-base-100">
                        <SignInForm />
                    </div>
                </div>
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Sign up</h1>
                        <p className="py-6">Sign up if you don't have an account already</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-xs shadow-2xl bg-base-100">
                        <SignUpForm />
                    </div>
                </div>
            </div>
            <CheckLoggedIn redirectUrl={'/'} redirectOnValid={true} />
            {signoutMsg && (
                <dialog className="modal" id="singoutModal" open>
                    <div className="modal-box flex justify-left items-center gap-5">
                        <CircleCheckBig height={60} width={60} className="text-error" />
                        <div>
                            <h3 className="font-bold text-lg">Signed out!</h3>
                            <p className="py-4">You have successfully been signed out!</p>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop bg-black bg-opacity-40">
                        <button>close</button>
                    </form>
                </dialog>
            )}
            {unauthorizedMsg && (
                <dialog className="modal" id="singoutModal" open>
                    <div className="modal-box flex justify-left items-center gap-5">
                        <CircleAlert height={60} width={60} className="text-error" />
                        <div>
                            <h3 className="font-bold text-lg">Please Sign in!</h3>
                            <p className="py-4">To visit this page you need to sign in or sign up if you don't have an account.</p>
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop bg-black bg-opacity-40">
                        <button>close</button>
                    </form>
                </dialog>
            )}
        </main>
    )
}