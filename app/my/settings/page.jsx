"use client"
import { supabase } from "@/utils/supabase";
import ErrorModal, { ShowErrorModal } from "@/components/modals/ErrorModal";
import SuccessModal, { ShowSuccessModal } from "@/components/modals/SuccessModal";

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
        return user;
    } catch (error) {
        console.error(error);
        return {};
    }
}

export default async function Settings() {
    let user = await getUserProfile();

    async function handleSaveUser(event) {
        event.preventDefault();
        if (event.target[0].value != user.username) {
            const { error } = await supabase
                .from("profiles")
                .update({ username: event.target[0].value })
                .eq("user_id", user.id);

            user = { ...user, ...{ username: event.target[0].value } }

            if (error) {
                console.error(error);
                ShowErrorModal();
                return;
            }
        }
        if(event.target[1].value) {
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
        <div className="w-full lg:w-1/2 px-4">
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
            <ErrorModal errorText={"An Error occured while saving your account data. Please try again later!"} />
            <SuccessModal successText={"Successfully saved your account data!"} />
        </div>
    )
}