"use client"

import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
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
            return;
        }

        const { data: { session } } = await supabase.auth.getSession();

        setIsLoading(false);
        router.replace('/?signin=1');
    }

    return (
        <form className="card-body" onSubmit={signInUser}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
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