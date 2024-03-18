import Image from "next/image";
import { supabase } from "@/utils/supabase";

async function getWishlists() {
  const { data, error } = await supabase
    .from('wishlists')
    .select('*');

  if (error) throw error;
  return data;
}

export default async function Home() {
  const wishlists = await getWishlists();

  console.log(wishlists);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <pre>
        {wishlists.map((wishlist, index) => 
          <div key={index} >{"{"}"id": {wishlist.id}{"}"}</div>
        )}
      </pre>
    </main>
  );
}
