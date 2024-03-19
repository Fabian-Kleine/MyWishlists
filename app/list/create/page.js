"use client"

import CheckLoggedIn from "@/utils/checkLoggedIn";
import { useSearchParams, useRouter } from "next/navigation";
import { generateUID } from "@/utils/generatID";
import { useState, useEffect } from "react";
import { PackagePlus, Share2, Link, Share, EllipsisVertical, Pen, Trash2, ShoppingCart } from "lucide-react";
import { supabase } from "@/utils/supabase";

export default function CreateList() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const list_id = searchParams.get("list_id");
    const wishlist_url = "https://mywishlists.fabian-kleine.dev/list/" + list_id;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [deadlineActive, setDeadlineActive] = useState(false);
    const [wishlist, setWishlist] = useState();

    function shareLink() {
        const shareData = {
            title,
            text: description,
            url: wishlist_url
        }

        navigator.share(shareData);
    }

    useEffect(() => {

        async function createWishlist() {
            await supabase
                .from("wishlists")
                .insert({ list_id });
        }

        async function getWishlist() {
            const { data } = await supabase
                .from("wishlists")
                .select("*")
                .eq("list_id", list_id)

            setWishlist(data[0]);
            setDeadlineActive(data[0].has_deadline)

            if (!data.length) {
                createWishlist()
            }
        }

        if (!list_id) {
            const id = generateUID();
            router.push('?list_id='+id);
        } else {
            getWishlist();
        }

    }, [searchParams]);

    async function handleAddWish() {
        //save wishlist
        await supabase
            .from("wishlists")
            .update({ 
                title,
                description,
                has_deadline: deadlineActive,
                deadline: date
            })
            .eq("list_id", list_id);

        //reroute
        router.push(`/list/create/addwish?list_id=${list_id}`);
    }

    return (
        <main className="flex min-h-screen bg-hero-img bg-hero flex-col items-center justify-between mobile:px-24">
            <div className="py-24 lg:px-24 w-full flex flex-col items-center">
                <h1 className="text-3xl sm:text-4xl text-center font-bold">Create Wishlist</h1>
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col gap-2">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg">Wishlist Title</span>
                            </div>
                            <input defaultValue={wishlist?.title} onChange={(e) => setTitle(e.target.value)} id="title" name="title" type="text" placeholder="Wishlist Title" className="input input-bordered input-lg w-full" />
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Short Description</span>
                            </div>
                            <textarea defaultValue={wishlist?.description} onChange={(e) => setDescription(e.target.value)} name="description" id="description" className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text flex items-center gap-2"><input defaultChecked={!deadlineActive} type="checkbox" className="toggle toggle-sm" onChange={(e) => setDeadlineActive(e.target.checked)} />Deadline<span className="badge badge-sm items-end">optional</span></span>
                            </div>
                            <input defaultValue={wishlist?.deadline} onChange={(e) => setDate(e.target.value)} disabled={!deadlineActive} id="date" name="date" type="date" className="input input-bordered w-full" />
                        </label>
                        <div className="flex justify-between flex-wrap items-center gap-5 mt-3">
                            <button onClick={handleAddWish} className="btn btn-primary px-24" type="button"><PackagePlus />Add Wish</button>
                            <div className="tooltip" data-tip="Share Wishlist">
                                <button type="button" onClick={() => document.getElementById('shareModal').showModal()} className="btn btn-ghost btn-circle"><Share2 /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center w-full gap-2 mt-24">
                    {Array.from({ length: 7 }).map(() =>
                        <div className="card card-compact w-96 bg-base-100 shadow-xl">
                            <figure><img src="https://placehold.co/460x250" alt="Product Image" /></figure>
                            <div className="card-body">
                                <h2 className="card-title text-2xl">Product</h2>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-accent">Price: 27,50 €</span>
                                    <div className="dropdown dropdown-top">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle m-1"><EllipsisVertical /></div>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><a><Pen height={15} />Edit</a></li>
                                            <li><a><Trash2 height={15} />Remove</a></li>
                                            <li><a><ShoppingCart height={15} />View Product</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <dialog id="shareModal" className="modal">
                <div className="modal-box overflow-visible">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Share this Wishlist</h3>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Wishlist Link</span>
                        </div>
                        <div className="join">
                            <input disabled id="title" name="title" type="text" value={wishlist_url} className="input input-bordered w-full join-item disabled:cursor-text" />
                            <div className="tooltip" data-tip="Copy Link to Clipboard">
                                <button onClick={() => navigator.clipboard.writeText(wishlist_url)} className="btn join-item"><Link /></button>
                            </div>
                        </div>
                    </label>
                    <div className="form-control mt-5">
                        <button onClick={shareLink} className="btn"><Share height={20} />Share Link</button>
                    </div>
                </div>
            </dialog>
            <CheckLoggedIn redirectUrl={'/my/signin?unauthorized=1'} redirectOnValid={false} />
        </main>
    )
}