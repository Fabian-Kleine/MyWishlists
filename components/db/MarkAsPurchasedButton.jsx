"use client"
import { supabase } from "@/utils/supabase";
import { useState, useEffect } from "react";
import { Gift, PinOff } from "lucide-react";

export default function MarkAsPurchasedButton({ productPurchased, productId, listId }) {
    productPurchased = productPurchased ? productPurchased : false;
    const [purchased, setPurchased] = useState(productPurchased);

    async function handleButtonClick() {
        const prevPurchased = purchased;
        setPurchased(!prevPurchased);
        try {
            const { data: { products }, error } = await supabase
                .from("wishlists")
                .select("products")
                .eq("list_id", listId)
                .single();

            if (error) {
                console.error(error);
                throw new Error(error);
            }

            const product = products.find(prdct => prdct.id == productId);

            let updatedProducts = [{
                id: productId,
                title: product.title,
                price: product.price,
                link: product.link,
                annotation: product.annotation,
                currency: product.currency,
                image: product.image,
                purchased: !prevPurchased
            }];

            let oldProducts = products;

            oldProducts.forEach((product, index) => {
                if (product.id == productId) {
                    oldProducts.splice(index, 1);
                }
            });

            updatedProducts = [...oldProducts, ...updatedProducts];

            const { error: saveError } = await supabase
                .from("wishlists")
                .update({ products: updatedProducts })
                .eq("list_id", listId)
                .single()

            if (saveError) {
                console.error(saveError);
                throw new Error(saveError);
            }
        } catch (error) {
            console.error(error);
            setPurchased(prevPurchased);
        }
    }

    useEffect(() => {
        const channel = supabase.channel(`purchase-update-${productId}`)
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'wishlists', filter: `list_id=eq.${listId}` },
                (payload) => {
                    const updatedProducts = payload.new.products;
                    const updatedPurchasedState = updatedProducts.find(prdct => prdct.id == productId).purchased;
                    setPurchased(updatedPurchasedState);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return (
        <button onClick={handleButtonClick} className="btn btn-primary w-full font-bold capitalize">
            {purchased ? (
                <><PinOff />Unmark</>
            ) : (
                <><Gift />Mark as purchased</>
            )}
        </button>
    )
}