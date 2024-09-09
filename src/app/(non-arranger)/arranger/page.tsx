import ApplyArtistBtn from "@/components/apply-artist-btn";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { DollarSign, Music, UserCog, Users } from "lucide-react";
import Link from "next/link";

export default async function Arranger() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-40 xl:px-64 ">
      <div className="text-center">
        <h1 className="font-semibold text-6xl  leading-normal">
          Be an Arranger and earn like a Millionaire!
        </h1>
        <p>Earn up to $1,000 a month with just 10 piano arrangements.</p>
      </div>

      {user ? (
        <ApplyArtistBtn id={user.id} />
      ) : (
        <Link href={"/login"} className="w-fit mx-auto">
          <Button className="w-fit mx-auto">Log In to Apply</Button>
        </Link>
      )}

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mx-auto text-center max-w-[500px]">
        <div className="border rounded-md p-4 aspect-square flex items-center justify-center flex-col gap-4 font-black text-yellow-600">
          <UserCog size={32} />
          <p>200 Artists</p>
        </div>
        <div className="border rounded-md p-4 aspect-square flex items-center justify-center flex-col gap-4 font-black text-blue-600">
          <Music size={32} />
          <p>200,000 Arrangements</p>
        </div>
        <div className="border rounded-md p-4 aspect-square flex items-center justify-center flex-col gap-4 font-black text-orange-600">
          <Users size={32} />
          <p>100,000 Customers</p>
        </div>
        <div className="border rounded-md p-4 aspect-square flex items-center justify-center flex-col gap-4 font-black text-green-600">
          <DollarSign size={32} />
          <p>$24 Avg. Spend</p>
        </div>
      </div>
    </div>
  );
}
