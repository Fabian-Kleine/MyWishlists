"use client"

import { Pencil, Trash2, LinkIcon, Share2, SquarePlus } from "lucide-react";
import ShareModal, { ShowShareModalButton } from "@/components/modals/ShareModal";
import ErrorModal, { ShowErrorModal } from "@/components/modals/ErrorModal";
import { supabase } from "@/utils/supabase";
import { Link } from 'next-view-transitions';
import DeleteWishlistButton from "@/components/db/DeleteWishlistButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";

async function getWishlists(router) {
    try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
            throw new Error(sessionError.message);
        }

        if (!session || !session.user) {
            throw new Error("User session not found");
        }

        const userId = session.user.id;

        const wishlists = await supabase
            .from("wishlists")
            .select("*")
            .eq("user", userId);

        return { data: wishlists.data, error: null };
    } catch (error) {
        console.error(error);
        if (error.includes("User session not found")) router.replace("/my/signin?unauthorized=1&redirectURL=%2Fmy%2Flists");
        return { data: [], error };
    }
}

export default function MyLists() {
    const router = useRouter();
    const [wishlists, setWishlists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        async function loadWishlists() {
            setIsLoading(true);
            const { data, error } = await getWishlists(router);
            if (error) {
                setErrorText(error);
                ShowErrorModal();
                setIsLoading(false);
                return;
            }
            setWishlists(data);
            setIsLoading(false);
        }

        loadWishlists();
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : wishlists?.length != 0 ?
                wishlists.map((wishlist, index) => (
                    <>
                        <ShareModal key={index} list_id={wishlist.list_id} title={wishlist.title} text={wishlist.description} modalId={wishlist.list_id} />
                        <div key={index} className="card w-96 bg-base-100 shadow-xl h-fit mx-4">
                            <div className="card-body py-5">
                                <h2 className="card-title">{wishlist.title ? wishlist.title : "[No Title]"}</h2>
                                <p className="line-clamp-3">{wishlist.description}</p>
                                <div className="card-actions justify-center">
                                    <Link href={`/list/create?list_id=${wishlist.list_id}`} className="btn btn-sm btn-primary flex-grow"><Pencil className="h-4 w-4" />Edit</Link>
                                    <DeleteWishlistButton list_id={wishlist.list_id} wishlists={wishlists} setWishlists={setWishlists} setErrorText={setErrorText} className="btn btn-sm btn-neutral flex-grow"><Trash2 className="h-4 w-4" />Delete</DeleteWishlistButton>
                                </div>
                                <div className="card-actions mt-1">
                                    <div className="tooltip tooltip-bottom" data-tip="Open Wishlist">
                                        <Link prefetch={false} href={"/list/" + wishlist.list_id} className="btn btn-sm btn-square"><LinkIcon className="h-4 w-4" /></Link>
                                    </div>
                                    <div className="tooltip tooltip-bottom" data-tip="Share Wishlist">
                                        <ShowShareModalButton modalId={wishlist.list_id} className="btn btn-sm btn-square"><Share2 className="h-4 w-4" /></ShowShareModalButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))
                : (
                    <div className="flex items-center flex-col w-full gap-5">
                        <h2 className="font-bold text-2xl ml-2 text-center">You have not created a Wishlist yet</h2>
                        <Link className="btn btn-primary btn-lg" href={"/list/create"}><SquarePlus className="h-6 w-6" />Create Wishlist</Link>
                    </div>
                )
            }
            <ErrorModal errorText={errorText} />
        </>
    )
}