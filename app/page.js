import { ScrollText, Users, Zap } from "lucide-react";
import ViewCount from "@/components/counters/ViewCount";
import WishlistCount from "@/components/counters/WishlistCount";
import UserCount from "@/components/counters/UserCount";

export default async function Home() {

  return (
    <main className="flex min-h-screen bg-hero-img bg-hero flex-col items-center justify-between px-24">
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold bg-gradient-logo text-transparent bg-clip-text leading-snug">My Wishlists</h1>
            <h2 className="text-lg py-6">Create Wishlists and share them</h2>
            <button className="btn btn-accent">Create Wishlist</button>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold my-3">Live Page Stats</h2>
      <div className="stats shadow mb-24">
        <div className="stat">
          <div className="stat-figure text-primary">
            <ScrollText height={30} width={30} />
          </div>
          <div className="stat-title">Wishlist</div>
          <div className="stat-value text-primary"><WishlistCount /></div>
          <div className="stat-desc invisible">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <Users height={30} width={30} />
          </div>
          <div className="stat-title">Registered Users</div>
          <div className="stat-value text-accent"><UserCount /></div>
          <div className="stat-desc invisible">21% more than last month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <Zap height={30} width={30} />
          </div>
          <div className="stat-title">Page Views</div>
          <div className="stat-value text-secondary"><ViewCount /></div>
          <div className="stat-desc text-secondary invisible">31 tasks remaining</div>
        </div>

      </div>
    </main>
  );
}
