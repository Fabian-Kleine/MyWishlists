"use client"

import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";

async function getViews() {
    const views  = await supabase
    .from('statistics')
    .select('views');
    return views.data[0].views;
}

export default function ViewCount() {
    const [views, setViews] = useState(0);

    useEffect(() => {
        setViews(getViews())
        const channel = supabase
            .channel('statistics')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: '*'
                },
                payload => setViews(getViews())
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, []);

    return <>{views}</>
}