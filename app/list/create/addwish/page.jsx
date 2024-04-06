"use client"

import { Save, CircleHelp } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import ErrorModal, { ShowErrorModal } from "@/components/modals/ErrorModal";
import Link from "next/link";
import Image from "next/image";
import { generateUID } from "@/utils/generatID";

export default function AddWish() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const list_id = searchParams.get("list_id");
    const mode = searchParams.get("mode");
    const product_id = searchParams.get("product_id");

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
            setLink(data.link);
            setIsLoading(false);
        }
        fetchProduct();

        async function getProducts() {
            setIsLoading(true);
            const { data: { products }, error } = await supabase
                .from("wishlists")
                .select("products")
                .eq("list_id", list_id)
                .single();

            if (error) {
                console.error(error);
                setErrorMsg("An error occured while fetching your wish to edit it.");
                ShowErrorModal();
                setIsLoading(false);
                return;
            }
            const product = products.find((p) => {
                return p.id == product_id;
            });
            setProductImage(product.image);
            setTitle(product.title);
            setPrice(product.price);
            setAnnotation(product.annotation);
            setCurrency(product.currency);
            setLink(product.link);
            setIsLoading(false);
        }
        if (mode == "edit") {
            getProducts()
        }
    }, [link, mode]);

    async function handleWishSave() {
        setIsLoading(true);
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
            setErrorMsg(error.message);
            ShowErrorModal();
            setIsLoading(false);
            return;
        }

        let updatedProducts = [{
            id: product_id || generateUID(),
            title,
            price,
            link,
            annotation,
            currency,
            image: productImage
        }];

        if (mode == "edit") {
            let oldProducts = products;

            oldProducts.forEach((product, index) => {
                if (product.id == product_id) {
                    oldProducts.splice(index, 1);
                }
            });

            updatedProducts = [...oldProducts, ...updatedProducts];
        }

        if (products && mode != "edit") updatedProducts = [...products, ...updatedProducts];

        const { error: saveError } = await supabase
            .from("wishlists")
            .update({ products: updatedProducts })
            .eq("list_id", list_id)
            .single()

        if (saveError) {
            console.error(saveError);
            setErrorMsg(saveError.message);
            ShowErrorModal();
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        router.push('/list/create?list_id=' + list_id);
    }

    return (
        <>
            <div className="py-24 lg:px-24 w-full flex flex-col items-center px-4">
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
                            <input defaultValue={link} disabled={isLoading} onBlur={(e) => setLink(e.target.value)} id="link" name="link" type="url" placeholder="https://some.shop.example/your-product" className="input input-bordered w-full" />
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
                            <textarea defaultValue={annotation} disabled={isLoading} onBlur={(e) => setAnnotation(e.target.value)} name="annotation" id="annotation" className="textarea textarea-bordered h-24" placeholder="Annotation"></textarea>
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
                        <div className="flex justify-center items-center mobile:justify-between flex-col mobile:flex-row mt-5">
                            <div className={`flex flex-col items-center mobile:items-start ${productImage?.length ? "visible" : "invisible"}`}>
                                <img className="w-1/2" src={productImage} alt="Product Image" />
                                <span>Product Image</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href={'/list/create?list_id=' + list_id} className="btn btn-error">Cancel</Link>
                                <button onClick={handleWishSave} disabled={isLoading} className="btn btn-primary px-12">{isLoading ? <><span className="loading loading-spinner"></span>Loading</> : <><Save className="mr-1" />Save</>}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                                <Image className="object-contain w-full h-full" width={400} height={400} src="/shop-logos/amazon.png" alt="Amazon" />
                            </figure>
                            <div className="card-body p-0 px-12 flex justify-start items-center">
                                <h2 className="card-title">Amazon</h2>
                            </div>
                        </a>
                        <a href="https://ebay.com" target="_blank" className="card bg-base-100 shadow-xl image-full">
                            <figure className="h-32 w-56 flex justify-center items-center">
                                <Image className="object-contain w-full h-full" width={400} height={400} src="/shop-logos/ebay.png" alt="eBay" />
                            </figure>
                            <div className="card-body p-0 px-12 flex justify-start items-center">
                                <h2 className="card-title">eBay</h2>
                            </div>
                        </a>
                        <a href="https://kleinanzeigen.de" target="_blank" className="card bg-base-100 shadow-xl image-full">
                            <figure className="h-32 w-56 flex justify-center items-center">
                                <Image className="object-contain w-full h-full" width={400} height={400} src="/shop-logos/kleinanzeigen.png" alt="Kleinanzeigen" />
                            </figure>
                            <div className="card-body p-0 px-12 flex justify-start items-center">
                                <h2 className="card-title">Kleinanzeigen</h2>
                            </div>
                        </a>
                        <a href="https://lego.com" target="_blank" className="card bg-base-100 shadow-xl image-full">
                            <figure className="h-32 w-56 flex justify-center items-center">
                                <Image className="object-contain w-full h-full" width={400} height={400} src="/shop-logos/lego.svg" alt="LEGO" />
                            </figure>
                            <div className="card-body p-0 px-12 flex justify-start items-center">
                                <h2 className="card-title">LEGO</h2>
                            </div>
                        </a>
                        <a href="https://zalando.com" target="_blank" className="card bg-base-100 shadow-xl image-full">
                            <figure className="h-32 w-56 flex justify-center items-center">
                                <Image className="object-contain w-full h-full" width={400} height={400} src="/shop-logos/zalando.jpg" alt="Zalando" />                            </figure>
                            <div className="card-body p-0 px-12 flex justify-start items-center">
                                <h2 className="card-title">Zalando</h2>
                            </div>
                        </a>
                        <a href="https://aboutyou.com" target="_blank" className="card bg-base-100 shadow-xl image-full">
                            <figure className="h-32 w-56 flex justify-center items-center">
                                <Image className="object-contain w-full h-full" width={400} height={400} src="/shop-logos/aboutyou.png" alt="About You" />                            </figure>
                            <div className="card-body p-0 px-12 flex justify-start items-center">
                                <h2 className="card-title">About You</h2>
                            </div>
                        </a>
                    </div>
                </div>
            </dialog>
        </>
    )
}