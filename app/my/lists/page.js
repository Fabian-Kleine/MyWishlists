import CheckLoggedIn from "@/utils/checkLoggedIn"
import { Pencil, Trash2, LinkIcon, Share2, SquarePlus } from "lucide-react";
import ShareModal, { ShowShareModalButton } from "@/components/modals/ShareModal";
import Link from "next/link";

export default function MyLists() {
    return (
        <main className="flex min-h-screen bg-hero-img bg-hero flex-col items-center justify-between mobile:px-24">
            <div className="py-24 lg:px-24 w-full flex flex-col items-center">
                <div className="flex justify-between items-center gap-2 w-full flex-col xs:flex-row">
                    <h1 className="text-3xl sm:text-4xl font-bold ml-2">My Wishlists</h1>
                    <Link className="btn btn-primary" href={"/list/create"}><SquarePlus className="h-5 w-5" />Create Wishlist</Link>
                </div>
                <div className="flex flex-wrap justify-left w-full gap-4 mt-12">
                    {Array.from({ length: 5 }).map((e, i) => (
                        <>
                            <ShareModal list_id={i} title={"Test title"} text={"Test Text"} modalId={`shareModal${i}`} />
                            <div key={i} className="card w-96 bg-base-100 shadow-xl">
                                <div className="card-body py-5">
                                    <h2 className="card-title">Wishlist title!</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque non nostrum vero ab et hic.</p>
                                    <div className="card-actions justify-center">
                                        <button className="btn btn-sm btn-primary flex-grow"><Pencil className="h-4 w-4" />Edit</button>
                                        <button className="btn btn-sm btn-neutral flex-grow"><Trash2 className="h-4 w-4" />Delete</button>
                                    </div>
                                    <div className="card-actions mt-1">
                                        <div className="tooltip tooltip-bottom" data-tip="Open Wishlist">
                                            <button className="btn btn-sm btn-square"><LinkIcon className="h-4 w-4" /></button>
                                        </div>
                                        <div className="tooltip tooltip-bottom" data-tip="Share Wishlist">
                                            <ShowShareModalButton modalId={`shareModal${i}`} className="btn btn-sm btn-square"><Share2 className="h-4 w-4" /></ShowShareModalButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            <CheckLoggedIn redirectUrl={'/my/signin?unauthorized=1'} redirectOnValid={false} />
        </main>
    )
}