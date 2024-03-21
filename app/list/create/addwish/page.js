"use client"

import { Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import ErrorModal, { ShowErrorModal } from "@/components/modals/ErrorModal";

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
        router.push('/list/create?list_id='+list_id);
    }

    return (
        <main className="flex min-h-screen bg-hero-img bg-hero flex-col items-center justify-between mobile:px-24">
            <div className="py-24 lg:px-24 w-full flex flex-col items-center">
                <h1 className="text-3xl sm:text-4xl text-center font-bold">Add Wish</h1>
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col gap-2">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg">Link {isLoading && <span className="loading loading-dots loading-sm relative top-2"></span>}</span>
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
                                <input disabled={isLoading} value={parseFloat(price.replace(",", "."))} onChange={(e) => setPrice(e.target.value)} id="price" name="price" type="number" placeholder="Price" className="input input-bordered w-full join-item" />
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
                            <button onClick={handleWishSave} disabled={isLoading} className="btn btn-primary px-12">{isLoading ? <><span className="loading loading-spinner"></span>Loading</> : <><Save className="mr-1" />Save</>}</button>
                        </div>
                    </div>
                </div>
            </div>
            <span>{errorMsg}</span>
            <ErrorModal errorText={errorMsg} />
        </main>
    )
}