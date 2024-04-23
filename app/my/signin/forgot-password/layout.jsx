import CheckLoggedIn from "@/utils/checkLoggedIn"

export default function Layout({ children }) {
    return (
        <main className="flex min-h-screen bg-hero-img bg-hero flex-col items-center justify-center mobile:px-24">
            <div className="hero w-full flex justify-evenly flex-col lg:flex-row items-start">
                <div className="hero-content flex-col">
                    {children}
                </div>
            </div>
            <CheckLoggedIn redirectUrl={'/'} redirectOnValid={true} />
        </main>
    )
}