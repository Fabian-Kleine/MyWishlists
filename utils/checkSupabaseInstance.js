"use client"

import { supabase } from "./supabase";
import ErrorModal from "@/components/modals/ErrorModal";
import { useEffect, useState } from "react";



export default function CheckSupabaseInstance() {
    const [returnStatus, setReturnStatus] = useState(<></>);
    useEffect(() => {
        async function getSupabaseStatus() {
            console.log('test')
            try {
                const { error } = await supabase
                .from('statistics')
                .select('*')
                .limit(1);
          
              if (error) throw error;

              setReturnStatus(<></>)
            } catch (error) {
                setReturnStatus(<ErrorModal defaultOpen errorText={"Connection to Database Instance failed. Please contact an admin."} />)
            }
        }

        getSupabaseStatus();
    }, []);

    return <>{returnStatus}</>
}