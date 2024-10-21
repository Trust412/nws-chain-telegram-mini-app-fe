/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import Boosteritem from "@/components/booster/booster"
import DailyFree from "@/components/booster/dailyfree"
import Homebutton from "@/components/button/homeButton"
import { userIDAtom } from "@/store/userInfo"
import { useAtom } from "jotai"
import { boosterData } from "@/data/booster"

interface NextLevelInfoData {
    value: number
    cost: number
}
export interface BoostData {
    fullBoosterEnergyCount: number
    recoverSpeedLevel: number
    rsNextLevelInfo: NextLevelInfoData;
    maxEnergyLevel: number;
    meNextLevelInfo: NextLevelInfoData;
    multiValueLevel: number;
    mvNextLevelInfo: NextLevelInfoData;
}

const Booster = () => {
  const [ userID ] = useAtom(userIDAtom)

  const [render, setRender] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Specify the type for error
    const [getData, setgetData] = useState<BoostData | undefined>(undefined);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<BoostData>(
            `https://b702-52-68-113-84.ngrok-free.app/api/get-booster-data/${userID}`,
            {
              headers: {
                Authorization: "Bearer your_token_here",
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning" : "rio"
              },
            }
          );
          setgetData(response.data)
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred"); // Improved error handling
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [render]);
  
    if (loading) return <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  ">Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    const initBooster = (initData:BoostData) => {
      boosterData[0].level = initData.recoverSpeedLevel ?? 0;
      boosterData[0].cost = initData.rsNextLevelInfo?.cost ?? 0;
      boosterData[1].level = initData.maxEnergyLevel ?? 0;
      boosterData[1].cost = initData.meNextLevelInfo?.cost ?? 0;
      boosterData[2].level = initData.multiValueLevel ?? 0;
      boosterData[2].cost = initData.mvNextLevelInfo?.cost ?? 0;
    }
    
    if (getData !== undefined) {
      initBooster(getData);
    }




    return(
        <div className="flex flex-col pt-4 gap-4">
            <Homebutton/>
            <div className="flex flex-col justify-center items-center">
                <Image className="w-20 h-[150px]" src={"/image/rocket.png"} alt="" width={80} height={150}/>
                <div className="text-2xl text-white font-bold  ">Booster</div>
            </div>
            <DailyFree data={getData!.fullBoosterEnergyCount} />
            <Boosteritem data={getData ?? undefined} setRender={setRender} render={render}/>
        </div>
    )
}

export default Booster
