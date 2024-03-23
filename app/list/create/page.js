"use client"

import Link from "next/link";
import CheckLoggedIn from "@/utils/checkLoggedIn";
import { useSearchParams, useRouter } from "next/navigation";
import { generateUID } from "@/utils/generatID";
import { useState, useEffect } from "react";
import { PackagePlus, Share2, EllipsisVertical, Pencil, Trash2, ShoppingCart, ImageOff } from "lucide-react";
import { supabase } from "@/utils/supabase";
import ErrorModal, { ShowErrorModal } from "@/components/modals/ErrorModal";
import ShareModal, { ShowShareModal } from "@/components/modals/ShareModal";

export default function CreateList() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const list_id = searchParams.get("list_id");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [deadlineActive, setDeadlineActive] = useState();
    const [wishlist, setWishlist] = useState();
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {

        async function createWishlist() {
            const { error } = await supabase
                .from("wishlists")
                .insert({ list_id });

            if (error) {
                console.error(error);
                setErrorMsg(error.message);
                ShowErrorModal();
            };
            setDeadlineActive(false);
        }

        async function getWishlist() {
            const { data, error } = await supabase
                .from("wishlists")
                .select("*")
                .eq("list_id", list_id)

            if (error) {
                console.error(error);
                setErrorMsg(error.message);
                ShowErrorModal();
                return;
            }

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

            if (error) {
                console.error(error);
                setErrorMsg(error.message);
                ShowErrorModal();
                return;
            }
        }
        saveWish();
    }, [title, description, deadlineActive, date]);

    async function handleDeleteProduct(id) {
        const { data: { products }, error } = await supabase
            .from("wishlists")
            .select("products")
            .eq("list_id", list_id)
            .single();

        if (error) {
            console.error(error);
            setErrorMsg(error.message);
            ShowErrorModal();
            return;
        }

        let updatedProducts = products;

        updatedProducts.forEach((product, index) => {
            if (product.id == id) {
                updatedProducts.splice(index, 1);
            }
        });

        const { data: wishlistData, error: updateError } = await supabase
            .from("wishlists")
            .update({ products: updatedProducts })
            .eq("list_id", list_id)
            .single()
            .select("*");

        if (updateError) {
            console.error(updateError);
            setErrorMsg(updateError.message);
            ShowErrorModal();
            return;
        }

        setWishlist(wishlistData);
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
                                <span className="label-text flex items-center gap-2"><input checked={deadlineActive} type="checkbox" className="toggle toggle-sm" onChange={(e) => setDeadlineActive(e.target.checked)} />Deadline<span className="badge badge-sm items-end">optional</span></span>
                            </div>
                            <input defaultValue={wishlist?.deadline} onBlur={(e) => setDate(e.target.value)} disabled={!deadlineActive} id="date" name="date" type="date" className="input input-bordered w-full" />
                        </label>
                        <div className="flex justify-between flex-wrap items-center gap-5 mt-3">
                            <Link href={`/list/create/addwish?list_id=${list_id}`} className="btn btn-primary px-24" type="button"><PackagePlus />Add Wish</Link>
                            <div className="tooltip" data-tip="Share Wishlist">
                                <button type="button" onClick={ShowShareModal} className="btn btn-ghost btn-circle"><Share2 /></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center w-full gap-2 mt-24">
                    {wishlist?.products?.length ?
                        wishlist.products.map((product, index) =>
                            <div key={index} className="card card-compact w-96 bg-base-100 shadow-xl h-fit">
                                <figure className="h-[250px] flex justify-center items-center">
                                    {product.image != null ? (
                                        <img className="object-cover" src={product.image} alt="Product Image" />
                                    ) : (
                                        <ImageOff height={90} width={90} className="object-cover" />
                                    )}
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-2xl line-clamp-2">{product.title}</h2>
                                    {product.annotation ? (
                                        <p className="line-clamp-3">{product.annotation}</p>
                                    ) : <></>}
                                    <div className={`flex ${product.price ? "justify-between" : "justify-end"} items-center`}>
                                        {product.price ? (
                                            <span className="text-xl font-bold text-accent">Price: {product.price} {product.currency}</span>
                                        ) : <></>}
                                        <div className="dropdown dropdown-top">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle m-1"><EllipsisVertical /></div>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                <li><Link href={`/list/create/addwish?list_id=${list_id}&mode=edit&product_id=${product.id}`}><Pencil height={15} />Edit</Link></li>
                                                <li><button onClick={() => handleDeleteProduct(product.id)}><Trash2 height={15} />Remove</button></li>
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
            <CheckLoggedIn redirectUrl={'/my/signin?unauthorized=1'} redirectOnValid={false} />
            <ErrorModal errorText={errorMsg} />
            <ShareModal list_id={list_id} title={title} text={description} />
        </main>
    )
}