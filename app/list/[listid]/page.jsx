import { supabase } from "@/utils/supabase"
import Countdown from "@/components/counters/Countdown";
import { ImageOff, ShoppingCart, Share2 } from "lucide-react";
import ShareModal, { ShowShareModalButton } from "@/components/modals/ShareModal";
import MarkAsPurchasedButton from "@/components/db/MarkAsPurchasedButton";
import { redirect } from "next/navigation";
import TextOverflow from "@/components/TextOverflow";

async function getWishlist(list_id) {
    const { data: wishlist, error } = await supabase
        .from("wishlists")
        .select("*")
        .eq("list_id", list_id)
        .single();

    if (error?.code == "PGRST116") redirect('/not-found');

    if (error) throw new Error(error);

    const { data: userData, error: errorUserError } = await supabase
        .from("profiles")
        .select("username")
        .eq("user_id", wishlist.user)
        .single();

    if (errorUserError) throw new Error(errorUserError);

    const wishlistData = { ...wishlist, ...userData };

    return wishlistData;
}

export default async function Wishlist({ params: { listid } }) {
    const wishlist = await getWishlist(listid);

    return (
        <>
            <div className="flex flex-col mobile:flex-row justify-start mobile:justify-between items-start mobile:items-end flex-wrap w-full gap-4 bg-base-100 p-4 rounded-lg">
                <div className="w-full mobile:w-2/3">
                    <h1 className="text-3xl sm:text-4xl w-full mobile:w-fit text-left font-bold">{wishlist.title ? wishlist.title : "[No Title]"}</h1>
                    <h2>Created by <span className="text-primary">{wishlist.username}</span></h2>
                    <p className="ml-1 mt-2 text-base sm:text-lg w-full lg:w-1/2">{wishlist.description}</p>
                </div>
                <div className="flex flex-col items-start 2xl:items-end">
                    <ShowShareModalButton className="btn btn-ghost btn-circle"><Share2 className="w-6 h-6" /></ShowShareModalButton>
                    {wishlist.has_deadline && (
                        <Countdown date={wishlist.deadline} />
                    )}
                </div>
            </div>
            <h2 className="w-full text-center mt-12 text-2xl sm:text-3xl font-bold">Wishes</h2>
            <div className="flex flex-wrap justify-center w-full gap-2 mt-8">
                {wishlist?.products?.length ?
                    wishlist.products.map((product, index) =>
                        <div key={index} className="card card-compact w-96 bg-base-100 shadow-xl h-fit">
                            <figure className="h-[250px] flex justify-center items-center">
                                {product.image ? (
                                    <img className="object-cover" src={product.image} alt="Product Image" />
                                ) : (
                                    <ImageOff height={90} width={90} className="object-cover" />
                                )}
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl line-clamp-2">{product.title}</h2>
                                {product.annotation ? (
                                    <TextOverflow clamp={3} maxLength={165}>{product.annotation}</TextOverflow>
                                ) : <></>}
                                <div className="flex justify-start items-center">
                                    {product.price ? (
                                        <span className="text-xl font-bold text-accent">Price: {product.price} {product.currency}</span>
                                    ) : <></>}
                                </div>
                                <div className="card-actions">
                                    <MarkAsPurchasedButton productPurchased={product.purchased} productId={product.id} listId={listid} />
                                    {product.link ? (
                                        <a className="btn btn-neutral w-full font-bold" href={product.link} target="_blank"><ShoppingCart />Visit Shop</a>
                                    ) : <></>}
                                </div>
                            </div>
                        </div>
                    ) : <>
                        No Wishes added
                    </>}
            </div>
            <ShareModal list_id={listid} title={wishlist.title} text={wishlist.description} />
        </>
    )
}

export const revalidate = 0