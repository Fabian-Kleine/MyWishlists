import Link from "next/link";
import { ScrollText, SquarePlus, User, LogIn } from "lucide-react";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 shadow-lg flex-col sm:flex-row">
            <div className="flex-1 bg-gradient-logo text-transparent bg-clip-text inline-block bg-nav-logo">
                <Link href={'/'} className="btn btn-ghost text-xl font-bold">My Wishlists</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal justify-center xs:justify-start px-1">
                    <li><Link className="gap-1" href="/list/create"><SquarePlus height={20} />Create Wishlist</Link></li>
                    <li>
                        <details>
                            <summary className="px-7">
                                <User height={20} />Profile
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                <li><Link className="p-2" href="/my/lists"><ScrollText height={20} />My Wishlists</Link></li>
                                <li><Link className="p-2" href="/my/signin"><LogIn height={20} />Sign in</Link></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}