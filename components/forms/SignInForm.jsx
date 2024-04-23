"use client"

import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";

export default function SignInForm({ redirectURL }) {
    const router = useRouter();

    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function signInUser(event) {
        event.preventDefault();
        setErrorMsg("");
        setIsLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: event.target[0].value,
            password: event.target[1].value,
        });

        if (error) {
            setErrorMsg("An error has occured: " + error.message);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        redirectURL = redirectURL ? redirectURL : "/?signin=1";
        router.replace(redirectURL);
    }

    return (
        <form className="card-body" onSubmit={signInUser}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="example@example.com" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="*******" className="input input-bordered" required />
                <label className="label">
                    <Link href="/my/signin/forgot-password" className="label-text-alt link link-hover">Forgot password?</Link>
                </label>
            </div>
            <div className="form-control">
                <span className="text-red-600">{errorMsg}</span>
            </div>
            <div className="form-control mt-6">
                <button disabled={isLoading} type="submit" className="btn btn-primary">{isLoading ? <><span className="loading loading-spinner loading-sm"></span> Loading...</> : "Sign in"}</button>
            </div>
        </form>
    )
}