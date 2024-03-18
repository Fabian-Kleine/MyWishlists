"use server"
import { supabase } from "./supabase";

const updateViews = async () => {
    const views  = await supabase
        .from('statistics')
        .select('views');
        
    await supabase
        .from('statistics')
        .update({ views: views.data[0].views + 1 })
        .eq('id', 1)
}

export default updateViews;