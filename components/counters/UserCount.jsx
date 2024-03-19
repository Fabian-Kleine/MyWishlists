"use client"

import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import abbrNum from "@/utils/abbrNum";

export default function UserCount() {
    const [users, setUsers] = useState(0);

    async function getUsers() {
        const users  = await supabase
        .from('profiles')
        .select('id');
        const abbrUserNum = abbrNum(users.data.length, 2);
        setUsers(abbrUserNum);
    }

    useEffect(() => {
        getUsers()
        const channel = supabase
            .channel('profiles')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: '*'
                },
                () => getUsers()
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, []);

    return <>{users}</>
}