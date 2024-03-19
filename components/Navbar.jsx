"use client"

import Link from "next/link";
import { ScrollText, SquarePlus, User, LogIn, LogOut, CircleCheckBig } from "lucide-react";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import SignOut from "./SignOut";

export default function Navbar() {
    const [sessionState, setSessionState] = useState();

    async function updateUserSession() {
        const { data: { session } } = await supabase.auth.getSession();
        setSessionState(session);
    }

    useEffect(() => {
        updateUserSession()
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setSessionState(session)
        })
    }, []);

    return (
        <>
            <div className="navbar bg-base-100 shadow-lg flex-col sm:flex-row">
                <div className="flex-1 bg-gradient-logo text-transparent bg-clip-text inline-block bg-nav-logo">
                    <Link href={'/'} className="btn btn-ghost text-xl font-bold">My Wishlists</Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal justify-center xs:justify-start px-1">
                        <li className="justify-center"><Link className="gap-1" href="/list/create"><SquarePlus height={20} />Create Wishlist</Link></li>
                        {sessionState != null ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <User height={28} width={28} />
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><Link href="/my/lists"><ScrollText height={20} />My Wishlists</Link></li>
                                    <li><SignOut><LogOut height={20} />Sign out</SignOut></li>
                                </ul>
                            </div>
                        ) : (
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
                        )
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}