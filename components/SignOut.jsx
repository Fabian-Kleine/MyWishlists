"use client"

import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function SignOut({ children }) {
    const router = useRouter();

    async function signOutUser() {
        await supabase.auth.signOut();
        router.replace('/my/signin?signout=1');
    }

    return (
        <button onClick={signOutUser}>{children}</button>
    )
}