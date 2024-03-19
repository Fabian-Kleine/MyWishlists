import { Save } from "lucide-react";

export default function AddWish({ searchParams }) {
    const list_id = searchParams.list_id;
    return (
        <main className="flex min-h-screen bg-hero-img bg-hero flex-col items-center justify-between mobile:px-24">
            <div className="py-24 lg:px-24 w-full flex flex-col items-center">
                <h1 className="text-3xl sm:text-4xl text-center font-bold">Add Wish</h1>
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col gap-2">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg">Link<span className="badge badge-error badge-outline ml-2">required</span></span>
                            </div>
                            <input id="link" name="link" type="url" placeholder="https://some.shop.example/your-product" className="input input-bordered w-full" />
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg">Title</span>
                            </div>
                            <input id="title" name="title" type="text" placeholder="Wish Title" className="input input-bordered w-full" />
                        </label>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text text-lg">Annotation</span>
                            </div>
                            <textarea name="annotation" id="annotation" className="textarea textarea-bordered h-24" placeholder="Annotation"></textarea>
                        </label>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text text-lg">Price</span>
                            </div>
                            <div className="join">
                                <input id="price" name="price" type="number" placeholder="Price" className="input input-bordered w-full join-item" />
                                <select className="select select-bordered w-1/3 max-w-xs join-item">
                                    <option selected>€ (Euro)</option>
                                    <option>$ (Dollar)</option>
                                </select>
                            </div>
                        </label>
                        <div className="flex justify-between mt-5">
                            <div>
                                <img className="w-1/2" src="https://m.media-amazon.com/images/I/51yoof+ffEL._AC_SL1000_.jpg" alt="Product Image" />
                                <span>Product Image</span>
                            </div>
                            <button className="btn btn-primary px-12"><Save className="mr-1" />Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}