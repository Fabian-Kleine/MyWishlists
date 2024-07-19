"use client"
import { supabase } from "@/utils/supabase";
import { ShowErrorModal } from "../modals/ErrorModal";

export default function DeleteWishlistButton({ className, children, list_id, wishlists, setWishlists, setErrorText }) {
    async function deleteWishlist() {
        try {
            const { error } = await supabase
                .from("wishlists")
                .delete()
                .eq("list_id", list_id);

            if (error) throw new Error(error);
            const wishlistIndex = wishlists.map(w => w.id).indexOf(list_id);
            const newWishlists = [...wishlists];
            newWishlists.splice(wishlistIndex, 1);
            setWishlists(newWishlists);
        } catch (error) {
            console.error(error);
            setErrorText(error);
            ShowErrorModal();
        }

    }

    return (
        <button className={className} onClick={deleteWishlist}>{children}</button>
    )
}