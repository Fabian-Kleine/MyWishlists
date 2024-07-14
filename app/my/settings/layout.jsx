import CheckLoggedIn from "@/utils/checkLoggedIn";

export default function Layout({ children }) {
    return (
        <main className="flex min-h-screen bg-hero-img bg-hero flex-col items-center justify-between mobile:px-24">
            <div className="py-24 lg:px-24 w-full flex flex-col items-center">
                <h1 className="text-3xl sm:text-4xl text-center font-bold ml-2">Account Settings</h1>
                {children}
            </div>
            <CheckLoggedIn redirectUrl={'/my/signin?unauthorized=1&redirectURL=%2Fmy%2Fsettings'} redirectOnValid={false} />
        </main>
    )
}