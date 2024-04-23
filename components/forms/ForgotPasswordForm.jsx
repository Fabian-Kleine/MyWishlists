"use client"

import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircleCheckBig } from "lucide-react";

export default function ForgotPasswordForm() {
    const router = useRouter();

    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPasswordFormActive, setNewPasswordFormActive] = useState(false);
    const [confirmModalActive, setConfirmModalActive] = useState({
        active: false,
        title: "",
        text: ""
    });

    function applyEmail(event) {
        event.preventDefault();
        setErrorMsg("");
        if (!event.target[0].value) {
            setErrorMsg("Email must not be empty!")
            return;
        }
        setEmail(event.target[0].value)
        setNewPasswordFormActive(true);
    }

    async function recoverPassword(event) {
        event.preventDefault();
        setErrorMsg("");
        if (!event.target[1].value) {
            setErrorMsg("You have to enter a new password!");
            return;
        }
        if (event.target[1].value.length < 6) {
            setErrorMsg("Your password has to be at least 6 characters long!");
            return;
        }
        setIsLoading(true);
        setPassword(event.target[1].value);
        setConfirmModalActive({
            active: true,
            title: "Password reset!",
            text: "An Email with a link to reset your password has been send to your email."
        });
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
            setErrorMsg(error.message);
            return;
        }
    }

    function resetForm() {
        setIsLoading(false);
        setErrorMsg("");
        setPassword("");
        setNewPasswordFormActive(false);
        setConfirmModalActive({
            active: false,
            title: "",
            text: ""
        });
    }

    useEffect(() => {
        const channel = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event == "PASSWORD_RECOVERY") {
                const newPassword = password;
                const { data, error } = await supabase.auth
                    .updateUser({ password: newPassword });

                setIsLoading(false);

                if (data) {
                    setConfirmModalActive({
                        active: true,
                        title: "Password reset!",
                        text: "Your password has been successfully changed. You will be redirected in 15 seconds." 
                    });
                    setTimeout(() => {
                        router.replace('/');
                    }, 15000);
                    return;
                }

                if (error) {
                    setErrorMsg(error.message);
                    console.log(error)
                    return;
                }
            }
        });

        return () => {
            channel.data.subscription.unsubscribe();
        }
    }, [password]);

    return (
        <>
            {newPasswordFormActive ? (
                <form className="card-body" onSubmit={recoverPassword}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" value={email} disabled className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">New Password</span>
                        </label>
                        <input disabled={isLoading} type="password" placeholder="******" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <span className="text-red-600">{errorMsg}</span>
                    </div>
                    <div className="form-control mt-6 gap-2">
                        <button disabled={isLoading} type="submit" className="btn btn-primary">{isLoading ? <><span className="loading loading-spinner loading-sm"></span> Waiting...</> : "Recover Password"}</button>
                        <button onClick={resetForm} className="btn btn-neutral" type="button">Reset Form</button>
                    </div>
                </form>
            ) : (
                <form className="card-body" onSubmit={applyEmail}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input defaultValue={email} type="email" placeholder="example@example.com" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <span className="text-red-600">{errorMsg}</span>
                    </div>
                    <div className="form-control mt-6">
                        <button disabled={isLoading} type="submit" className="btn btn-primary">{isLoading ? <><span className="loading loading-spinner loading-sm"></span> Loading...</> : "Recover Password"}</button>
                    </div>
                </form>
            )}
            <dialog className="modal" open={confirmModalActive.active}>
                <div className="modal-box flex justify-left items-center gap-5">
                    <CircleCheckBig height={100} width={100} className="text-accent" />
                    <div>
                        <h3 className="font-bold text-lg">{confirmModalActive.title}</h3>
                        <p className="py-4">{confirmModalActive.text}</p>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop bg-black bg-opacity-40">
                    <button onClick={() => setConfirmModalActive({
                        active: false,
                        title: "",
                        text: ""
                    })}>close</button>
                </form>
            </dialog>
        </>
    )
}