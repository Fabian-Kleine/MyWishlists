"use client"

import { supabase } from "@/utils/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
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
            return;
        }

        await supabase
            .from("profiles")
            .insert({ username: event.target[0].value });

        setIsLoading(false);
        router.replace('/?signup=1');
    }

    return (
        <form className="card-body" onSubmit={signUpUser}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Username</span>
                </label>
                <input type="text" placeholder="username" className="input input-bordered" required />
            </div>
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