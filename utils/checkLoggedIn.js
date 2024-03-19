"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "./supabase";

export default function CheckLoggedIn({ redirectUrl, redirectOnValid }) {
    const router = useRouter();

    useEffect(() => {
        async function getUserSession() {
            const { data, error } = await supabase.auth.getSession();

            if (redirectOnValid == true && data.session) {
                router.replace(redirectUrl);
                return;
            }

            if(redirectOnValid == false && !data.session) {
                router.replace(redirectUrl);
            }
        }

        getUserSession()
    }, []);
}