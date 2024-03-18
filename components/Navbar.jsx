import Link from "next/link"

export default function Navbar() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1 bg-gradient-logo text-transparent bg-clip-text inline-block bg-nav-logo">
                <Link href={'/'} className="btn btn-ghost text-xl font-bold">My Wishlists</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href={'/wishlists'}>View your Wishlists</Link></li>
                </ul>
            </div>
        </div>
    )
}