"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";

import Homebutton from "@/components/button/homeButton";
import InvitePool from "@/components/invitepool/invitepool";
import Balances from "@/components/reward/Balances";

export default function Reward() {
  const router = useRouter();

  return (
    <div className="min-h-screen text-white p-4">
      <Homebutton/>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center mb-4   px-8">
          $NWS Already Listed On 2 Exchanges
        </h1>
        <div className="bg-gradient-to-t from-[#e30f2e] to-[#db1360] rounded-lg flex p-4">
            <div className="flex justify-center items-center gap-2 w-1/2">
              <Image className="rounded-xl" src={"/image/logo/mexc2.png"} alt="" width={120} height={32}/>
            </div>
            <div className="flex justify-center items-center gap-2 w-1/2">
              <Image className="rounded-xl" src={"/image/logo/quickswap.webp"} alt="" width={110} height={32}/>
            </div>
        </div>

        <button className="w-full py-1.5 rounded-full bg-gradient-to-r from-[#DF1174] to-[#DF1174] text-white font-bold">
          <a target="_blank" href="https://coinmarketcap.com/currencies/nodewaves/">
            See $NWS on CoinMarketCap &gt;
          </a>
        </button>

        <div>
          <div className="font-bold py-1  ">RoadMap</div>
          <div className="bg-gradient-to-t from-[#e30f2e] to-[#db1360] text-[#FFFFFF] text-base rounded-lg p-4 flex flex-col gap-4">
            <div className="cursor-pointer font-bold text-center">We are about launching our NFT marketplace</div>
            <div className="cursor-pointer font-bold text-center" onClick={() => router.push("/quest")}>Complete quest to learn more</div>
          </div>
        </div>

        <Balances/>
        <InvitePool title="NWS REWARDS POOL" />
      </div>
    </div>
  );
}
