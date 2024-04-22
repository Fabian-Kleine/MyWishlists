"use client"

import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm({ redirectURL }) {
    const router = useRouter();

    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function signUpUser(event) {
        event.preventDefault();
        setErrorMsg("");
        setIsLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: event.target[1].value,
            password: event.target[2].value,
        });

        if (error) {
            setErrorMsg("An error has occured: " + error.message);
            setIsLoading(false);
            return;
        }

        await supabase
            .from("profiles")
            .insert({ username: event.target[0].value });

        setIsLoading(false);
        redirectURL = redirectURL ? redirectURL : "/?signup=1";
        router.replace(redirectURL);
    }

    return (
        <form className="card-body" onSubmit={signUpUser}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Username</span>
                </label>
                <input type="text" placeholder="Username" className="input input-bordered" required />
            </div>
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
            </div>
            <div className="form-control">
                <span className="text-red-600">{errorMsg}</span>
            </div>
            <div className="form-control mt-6">
                <button disabled={isLoading} type="submit" className="btn btn-success">{isLoading ? <><span className="loading loading-spinner loading-sm"></span> Loading...</> : "Sign up"}</button>
            </div>
        </form>
    )
}