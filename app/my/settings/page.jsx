"use client"
import { supabase } from "@/utils/supabase";
import ErrorModal, { ShowErrorModal } from "@/components/modals/ErrorModal";
import SuccessModal, { ShowSuccessModal } from "@/components/modals/SuccessModal";
import { useEffect, useState } from "react";

async function getUserProfile() {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
            throw new Error(sessionError.message);
        }

        const { data: profile, error } = await supabase
            .from("profiles")
            .select("username")
            .eq("user_id", session.user.id)
            .single();

        if (error) throw new Error(error);

        const user = { ...session.user, ...profile };
        return { data: user, error: null };
    } catch (error) {
        console.error(error);
        return { data: null, error };
    }
}

export default function Settings() {
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        async function loadUserProfile() {
            setIsLoading(true);
            const { data, error } = await getUserProfile();
            if (error) {
                setErrorText(error);
                ShowErrorModal();
                setIsLoading(false);
                return;
            }
            setUser(data);
            setIsLoading(false);
        }

        loadUserProfile();
    }, []);

    async function handleSaveUser(event) {
        event.preventDefault();
        if (event.target[0].value != user.username) {
            const { error } = await supabase
                .from("profiles")
                .update({ username: event.target[0].value })
                .eq("user_id", user.id);

            setUser({ ...user, ...{ username: event.target[0].value } })

            if (error) {
                console.error(error);
                setErrorText("An Error occured while saving your account data. Please try again later!")
                ShowErrorModal();
                return;
            }
        }
        if (event.target[1].value) {
            const { error } = await supabase.auth.updateUser({
                password: event.target[1].value
            });

            if (error) {
                console.error(error);
                ShowErrorModal();
                return;
            }

            event.target[1].value = "";
        }

        ShowSuccessModal();
    }

    return (
        <>
            {isLoading ?
                <span className="loading loading-spinner loading-lg mt-10"></span>
                : <div className="w-full lg:w-1/2 px-4">
                    <form onSubmit={handleSaveUser}>
                        <div className="flex flex-col gap-2">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text text-lg">Username</span>
                                </div>
                                <input defaultValue={user?.username} id="username" name="username" type="text" placeholder="Username" className="input input-bordered input-lg w-full" />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">New Password</span>
                                </div>
                                <input id="newpassword" name="newpassword" type="password" placeholder="******" className="input input-bordered w-full" />
                            </label>
                            <div className="flex justify-end mt-5">
                                <button className="btn btn-primary" type="submit">Save</button>
                            </div>
                        </div>
                    </form>
                    <ErrorModal errorText={errorText} />
                    <SuccessModal successText={"Successfully saved your account data!"} />
                </div>
            }
        </>
    )
}