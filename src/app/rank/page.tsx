"use client"
import Homebutton from "@/components/button/homeButton";
import RankList from "@/components/ranklist/rankList";
import { Tabs } from "@/components/switch/switch"
import Image from "next/image"
import { useState } from "react";

const Rank = () => {

    
    const [sort, setSort] = useState(0)
    
    return(
        <div className="px-4 flex flex-col gap-4">
            <Homebutton/>
            <div className="flex flex-col justify-center items-center py-5 text-white">
                <Image src={"/image/rank.png"} alt="" width={120} height={140}/>
                <div className="text-2xl font-bold my-2.5">Rank</div>
                <div className="text-xs">The leaderboard is refreshed every 30 minutes.</div>
            </div>
            <div className="flex justify-center items-center">
                <Tabs tabs={['NWS Points', 'Referrals']} defaultTab="NWS Points" setSort={setSort}/>
            </div>
            <RankList sort={sort}/>
        </div>
    )
}

export default Rank;