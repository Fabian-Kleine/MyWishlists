import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }) {
    return (
        <main className="flex min-h-screen bg-hero-img bg-hero flex-col items-center justify-between mobile:px-24">
            <div className="py-24 lg:px-24 w-full flex flex-col items-center">
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </div>
        </main>
    )
}