"use client"

import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";

async function getDevices() {
    const devices  = await supabase
    .from('devices')
    .select('id');
    return devices.data.length;
}

export default function DeviceCount() {
    const [devices, setDevices] = useState(0);

    useEffect(() => {
        setDevices(getDevices())
        const channel = supabase
            .channel('devices')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: '*'
                },
                () => setDevices(getDevices())
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, []);

    return <>{devices}</>
}