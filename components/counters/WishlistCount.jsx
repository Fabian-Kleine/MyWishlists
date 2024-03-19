"use client"

import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import abbrNum from "@/utils/abbrNum";

export default function WishlistCount() {
    const [wishlists, setWishlists] = useState(0);

    async function getWishlists() {
        const wishlists  = await supabase
        .from('wishlists')
        .select('id');
        const abbrWishlistNumber = abbrNum(wishlists.data.length, 2);
        setWishlists(abbrWishlistNumber);
    }

    useEffect(() => {
        getWishlists()
        const channel = supabase
            .channel('wishlists')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: '*'
                },
                () => getWishlists()
            )
            .subscribe();  

        return () => {
            supabase.removeChannel(channel)
        }
    }, []);

    return <>{wishlists}</>
}