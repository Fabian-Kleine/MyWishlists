"use client"

import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import abbrNum from "@/utils/abbrNum";

export default function DeviceCount() {
    const [devices, setDevices] = useState(0);

    async function getDevices() {
        const devices  = await supabase
        .from('devices')
        .select('id');
        const abbrDeviceNum = abbrNum(devices.data.length, 2);
        setDevices(abbrDeviceNum);
    }

    useEffect(() => {
        getDevices()
        const channel = supabase
            .channel('devices')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: '*'
                },
                () => getDevices()
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, []);

    return <>{devices}</>
}