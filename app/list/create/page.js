"use client"

import Link from "next/link";
import CheckLoggedIn from "@/utils/checkLoggedIn";
import { useSearchParams, useRouter } from "next/navigation";
import { generateUID } from "@/utils/generatID";
import { useState, useEffect } from "react";
import { PackagePlus, Share2, LinkIcon, Share, EllipsisVertical, Pen, Trash2, ShoppingCart, ImageOff } from "lucide-react";
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
            const { error } = await supabase
                .from("wishlists")
                .insert({ list_id });

            if (error) console.error(error);
        }

        async function getWishlist() {
            const { data, error } = await supabase
                .from("wishlists")
                .select("*")
                .eq("list_id", list_id)

            if (error) {
                console.error(error);
                return;
            };

            if (!data.length) {
                createWishlist()
            } else {
                setWishlist(data[0]);
                setDeadlineActive(data[0].has_deadline)
            }
        }

        if (!list_id) {
            const id = generateUID();
            router.push('?list_id=' + id);
        } else {
            getWishlist();
        }

    }, [searchParams]);

    useEffect(() => {
        async function saveWish() {
            const updateData = {
                ...(title ? { title } : {}),
                ...(description ? { description } : {}),
                ...{ has_deadline: deadlineActive },
                ...(date ? { deadline: date } : {}),
            }
            const { error } = await supabase
                .from("wishlists")
                .update(updateData)
                .eq("list_id", list_id);

            if (error) console.error(error);
        }
        saveWish();
    }, [title, description, deadlineActive, date]);

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
                            <input defaultValue={wishlist?.title} onBlur={(e) => setTitle(e.target.value)} id="title" name="title" type="text" placeholder="Wishlist Title" className="input input-bordered input-lg w-full" />
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Short Description</span>
                            </div>
                            <textarea defaultValue={wishlist?.description} onBlur={(e) => setDescription(e.target.value)} name="description" id="description" className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text flex items-center gap-2"><input defaultChecked={deadlineActive} type="checkbox" className="toggle toggle-sm" onChange={(e) => setDeadlineActive(e.target.checked)} />Deadline<span className="badge badge-sm items-end">optional</span></span>
                            </div>
                            <input defaultValue={wishlist?.deadline} onBlur={(e) => setDate(e.target.value)} disabled={!deadlineActive} id="date" name="date" type="date" className="input input-bordered w-full" />
                        </label>
                        <div className="flex justify-between flex-wrap items-center gap-5 mt-3">
                            <Link href={`/list/create/addwish?list_id=${list_id}`} className="btn btn-primary px-24" type="button"><PackagePlus />Add Wish</Link>
                            <div className="tooltip" data-tip="Share Wishlist">
                                <button type="button" onClick={() => document.getElementById('shareModal').showModal()} className="btn btn-ghost btn-circle"><Share2 /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center w-full gap-2 mt-24">
                    {wishlist?.products?.length ?
                        wishlist.products.map((product, index) =>
                            <div key={index} className="card card-compact w-96 bg-base-100 shadow-xl">
                                <figure className="h-[250px] flex justify-center items-center">
                                    {product.image != null ? (
                                        <img className="object-cover" src={product.image} alt="Product Image" />
                                    ) : (
                                        <ImageOff height={90} width={90} className="object-cover" />
                                    )}
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-2xl line-clamp-2">{product.title}</h2>
                                    <div className={`flex ${product.price ? "justify-between" : "justify-end"} items-center`}>
                                        {product.price ? (
                                            <span className="text-xl font-bold text-accent">Price: {product.price} {product.currency}</span>
                                        ) : <></>}
                                        <div className="dropdown dropdown-top">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle m-1"><EllipsisVertical /></div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><a><Pen height={15} />Edit</a></li>
                                                <li><a><Trash2 height={15} />Remove</a></li>
                                                {product.link ? (
                                                    <li><a href={product.link} target="_blank"><ShoppingCart height={15} />View Product</a></li>
                                                ) : <></>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : <></>}
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
                                <button onClick={() => navigator.clipboard.writeText(wishlist_url)} className="btn join-item"><LinkIcon /></button>
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