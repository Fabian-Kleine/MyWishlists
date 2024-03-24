"use client"
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function DeleteWishlistButton({ className, children, list_id }) {
    const router = useRouter();
    async function deleteWishlist() {
        const { error } = await supabase
            .from("wishlists")
            .delete()
            .eq("list_id", list_id);

        if (error) console.error(error);
        router.refresh();
    }

    return (
        <button className={className} onClick={deleteWishlist}>{children}</button>
    )
}