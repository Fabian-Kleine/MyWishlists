"use client"
import { useEffect } from "react";
import fetchUserId from "@/utils/fetchUserId";
import { supabase } from "@/utils/supabase";

export default function UpdateUserCookie() {
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event == "SIGNED_OUT" || (event == "INITIAL_SESSION" && !session)) {
                fetchUserId(null);
                return;
            }
            const userId = session.user.id;
            fetchUserId(userId);
        })
    }, []);
}