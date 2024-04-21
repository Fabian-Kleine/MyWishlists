import { Suspense } from "react";
import Loading from "./loading";
import { Link } from 'next-view-transitions';
import CheckLoggedIn from "@/utils/checkLoggedIn";
import { Gift } from "lucide-react";

export default function Layout({ children }) {
    return (
        <main className="flex min-h-screen bg-hero-img bg-hero flex-col items-center justify-between mobile:px-24">
            <div className="py-24 lg:px-24 w-full flex flex-col items-center">
                <div className="flex justify-between items-center gap-2 w-full flex-col xs:flex-row">
                    <h1 className="text-3xl sm:text-4xl font-bold ml-2">My Wishlists</h1>
                    <Link className="btn btn-primary" href={"/list/create"}><Gift className="h-5 w-5" />Create Wishlist</Link>
                </div>
                <div className="flex flex-wrap justify-left w-full gap-4 mt-12">
                    <Suspense fallback={<Loading />}>
                        {children}
                    </Suspense>
                </div>
            </div>
            <CheckLoggedIn redirectUrl={'/my/signin?unauthorized=1&redirectURL=%2Fmy%2Flists'} redirectOnValid={false} />
        </main>
    )
}