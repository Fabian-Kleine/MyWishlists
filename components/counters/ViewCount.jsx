"use client"

import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import abbrNum from "@/utils/abbrNum";

export default function ViewCount() {
    const [views, setViews] = useState(0);

    async function getViews() {
        const views  = await supabase
        .from('statistics')
        .select('views');
        const abbrViewsNum = abbrNum(views.data[0].views, 2);
        setViews(abbrViewsNum);
    }

    useEffect(() => {
        getViews()
        const channel = supabase
            .channel('statistics')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: '*'
                },
                () => getViews()
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, []);

    return <>{views}</>
}