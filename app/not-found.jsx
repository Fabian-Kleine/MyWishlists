import Link from 'next/link'
import Image from "next/image"
import { Home } from "lucide-react"

export default function NotFoundPage() {
    return (
        <main className="flex min-h-screen bg-hero-img bg-hero flex-col items-center justify-between mobile:px-24">
            <div className="py-24 lg:px-24 w-full flex flex-col items-center gap-10">
                <div>
                    <Image src={'/404-Error.svg'} height={400} width={400} />
                    <a className="link text-center block text-xs" href="https://storyset.com/web" target="_blank">Web illustrations by Storyset</a>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl sm:text-4xl text-center font-bold ml-2">404 - Page Not Found!</h1>
                    <p>The page you are looking for was moved or doesn't exist!</p>
                </div>
                <Link prefetch={false} href={'/'} className="btn btn-primary btn-lg font-bold"><Home />Home</Link>
            </div>
        </main>
    )
}