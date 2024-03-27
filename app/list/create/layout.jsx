import { Suspense } from "react";
import CheckLoggedIn from "@/utils/checkLoggedIn";

export default function Layout({ children }) {
    return (
        <>
            <main className="flex min-h-screen bg-hero-img bg-hero flex-col items-center justify-between mobile:px-24">
                <Suspense fallback={
                    <span className="loading loading-spinner loading-lg mt-10"></span>
                }>
                    {children}
                </Suspense>
            </main>
            <CheckLoggedIn redirectUrl={'/my/signin?unauthorized=1&redirectURL=%2Flist%2Fcreate'} redirectOnValid={false} />
        </>
    )
}