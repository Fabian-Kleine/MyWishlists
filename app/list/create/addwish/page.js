"use client"

import { Save, CircleHelp } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import ErrorModal, { ShowErrorModal } from "@/components/modals/ErrorModal";
import Link from "next/link";

export default function AddWish() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const list_id = searchParams.get("list_id");

    const [link, setLink] = useState("");
    const [title, setTitle] = useState("");
    const [annotation, setAnnotation] = useState("");
    const [price, setPrice] = useState("");
    const [currency, setCurrency] = useState("€");
    const [productImage, setProductImage] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        async function fetchProduct() {
            setIsLoading(true);
            const productData = {
                link,
                title,
                price
            }
            const res = await fetch('/api/getProduct', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData)
            });
            const data = await res.json();
            setProductImage(data.image);
            setTitle(data.title);
            setPrice(data.price);
            setIsLoading(false);
        }
        fetchProduct();
    }, [link]);

    async function handleWishSave() {
        setIsLoading(true);
        setErrorMsg("");
        if (!title) {
            setErrorMsg("Title is required!");
            ShowErrorModal();
            setIsLoading(false);
            return;
        }
        const { data: { products }, error } = await supabase
            .from("wishlists")
            .select("products")
            .eq("list_id", list_id)
            .single();

        if (error) {
            console.error(error);
            setErrorMsg(error);
            ShowErrorModal();
            setIsLoading(false);
            return;
        }

        let updatedProducts = [{
            id: products?.length + 1 || 1,
            title,
            price,
            link,
            annotation,
            currency,
            image: productImage
        }];

        if (products) updatedProducts = [...products, ...updatedProducts];

        const { error: saveError } = await supabase
            .from("wishlists")
            .update({ products: updatedProducts })
            .eq("list_id", list_id)
            .single()

        if (saveError) {
            console.error(saveError);
            setErrorMsg(saveError);
            ShowErrorModal();
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        router.push('/list/create?list_id=' + list_id);
    }

    return (
        <main className="flex min-h-screen bg-hero-img bg-hero flex-col items-center justify-between mobile:px-24">
            <div className="py-24 lg:px-24 w-full flex flex-col items-center">
                <h1 className="text-3xl sm:text-4xl text-center font-bold">Add Wish</h1>
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col gap-2">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg">Link
                                    {isLoading && <span className="loading loading-dots loading-sm relative top-2"></span>}
                                    <div className="tooltip" data-tip="See supported websites">
                                        <button onClick={() => document.getElementById('supportedWebsitesModal').showModal()} aria-label="See supported websites" className="btn btn-ghost btn-circle text-info btn-xs"><CircleHelp className="h-4" /></button>
                                    </div>
                                </span>
                            </div>
                            <input disabled={isLoading} onBlur={(e) => setLink(e.target.value)} id="link" name="link" type="url" placeholder="https://some.shop.example/your-product" className="input input-bordered w-full" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg">Title{isLoading && <span className="loading loading-dots loading-sm relative top-2 ml-1"></span>}<span className="badge badge-error badge-outline ml-2">required</span></span>
                            </div>
                            <input disabled={isLoading} value={title} onChange={(e) => setTitle(e.target.value)} id="title" name="title" type="text" placeholder="Wish Title" className="input input-bordered w-full" />
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text text-lg">Annotation</span>
                            </div>
                            <textarea disabled={isLoading} onChange={(e) => setAnnotation(e.target.value)} name="annotation" id="annotation" className="textarea textarea-bordered h-24" placeholder="Annotation"></textarea>
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg">Price {isLoading && <span className="loading loading-dots loading-sm relative top-2"></span>}</span>
                            </div>
                            <div className="join">
                                <input disabled={isLoading} value={price} onChange={(e) => setPrice(e.target.value)} id="price" name="price" type="text" placeholder="Price" className="input input-bordered w-full join-item" />
                                <select disabled={isLoading} defaultValue={"€"} onChange={(e) => setCurrency(e.target.value)} className="select select-bordered w-1/3 max-w-xs join-item">
                                    <option value={"€"} defaultValue>€ (Euro)</option>
                                    <option value={"$"}>$ (Dollar)</option>
                                </select>
                            </div>
                        </label>
                        <div className="flex justify-between mt-5">
                            <div className={productImage?.length ? "visible" : "invisible"}>
                                <img className="w-1/2" src={productImage} alt="Product Image" />
                                <span>Product Image</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href={'/list/create?list_id='+list_id} className="btn btn-error">Cancel</Link>
                                <button onClick={handleWishSave} disabled={isLoading} className="btn btn-primary px-12">{isLoading ? <><span className="loading loading-spinner"></span>Loading</> : <><Save className="mr-1" />Save</>}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span>{errorMsg}</span>
            <ErrorModal errorText={errorMsg} />
            <dialog id="supportedWebsitesModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Supported Websites</h3>
                    <p className="py-4">Images, Titles and Prices can be fetched from these websites:</p>
                    <div className="flex justify-evenly flex-wrap gap-3">
                        <a href="https://amazon.com" target="_blank" className="card bg-base-100 shadow-xl image-full">
                            <figure className="h-32 w-56 flex justify-center items-center">
                                <img className="object-contain w-full h-full" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" />
                            </figure>
                            <div className="card-body p-0 px-12 flex justify-start items-center">
                                <h2 className="card-title">Amazon</h2>
                            </div>
                        </a>
                        <a href="https://ebay.com" target="_blank" className="card bg-base-100 shadow-xl image-full">
                            <figure className="h-32 w-56 flex justify-center items-center">
                                <img className="object-contain w-full h-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/2560px-EBay_logo.svg.png" alt="eBay" />
                            </figure>
                            <div className="card-body p-0 px-12 flex justify-start items-center">
                                <h2 className="card-title">eBay</h2>
                            </div>
                        </a>
                        <a href="https://kleinanzeigen.de" target="_blank" className="card bg-base-100 shadow-xl image-full">
                            <figure className="h-32 w-56 flex justify-center items-center">
                                <img className="object-contain w-full h-full" src="https://themen.kleinanzeigen.de/thumbnails/75262aff9fb768361164bfe90d87fceaed5f60d7/sharing.9dd29df345d7.png" alt="Kleinanzeigen" />
                            </figure>
                            <div className="card-body p-0 px-12 flex justify-start items-center">
                                <h2 className="card-title">Kleinanzeigen</h2>
                            </div>
                        </a>
                        <a href="https://lego.com" target="_blank" className="card bg-base-100 shadow-xl image-full">
                            <figure className="h-32 w-56 flex justify-center items-center">
                                <img className="object-contain w-full h-full" src="https://assets.lego.com/logos/v4.5.0/brand-lego.svg" alt="LEGO" />
                            </figure>
                            <div className="card-body p-0 px-12 flex justify-start items-center">
                                <h2 className="card-title">LEGO</h2>
                            </div>
                        </a>
                        <a href="https://zalando.com" target="_blank" className="card bg-base-100 shadow-xl image-full">
                            <figure className="h-32 w-56 flex justify-center items-center">
                                <img className="object-contain w-full h-full" src="https://corporate.zalando.com/sites/default/files/styles/teaser_hero_extra_small/public/media/zalando-logo.jpg?h=4b68583a&itok=Ni_XeYjZ" alt="Zalando" />
                            </figure>
                            <div className="card-body p-0 px-12 flex justify-start items-center">
                                <h2 className="card-title">Zalando</h2>
                            </div>
                        </a>
                        <a href="https://aboutyou.com" target="_blank" className="card bg-base-100 shadow-xl image-full">
                            <figure className="h-32 w-56 flex justify-center items-center">
                                <img className="object-contain w-full h-full" src="https://corporate.aboutyou.de/app/uploads/2016/09/AY_Logo.png" alt="About You" />
                            </figure>
                            <div className="card-body p-0 px-12 flex justify-start items-center">
                                <h2 className="card-title">About You</h2>
                            </div>
                        </a>
                    </div>
                </div>
            </dialog>
        </main>
    )
}