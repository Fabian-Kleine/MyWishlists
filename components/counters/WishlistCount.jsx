"use client"

import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";

async function getWishlists() {
    const wishlists  = await supabase
    .from('wishlists')
    .select('id');
    return wishlists.data.length;
}

export default function WishlistCount() {
    const [wishlists, setWishlists] = useState(0);

    useEffect(() => {
        setWishlists(getWishlists())
        const channel = supabase
            .channel('wishlists')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: '*'
                },
                () => setWishlists(getWishlists())
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, []);

    return <>{wishlists}</>
}