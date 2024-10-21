"use client";
import FindCard from "@/components/farm/findCard";
import InvitePool from "@/components/invitepool/invitepool";
import ButtonGroup from "../../components/farm/buttonGroup";
import { Tabs } from "@/components/switch/switch";
import { useEffect, useState } from "react";
import CardList from "@/components/farm/cardList";
import Homebutton from "@/components/button/homeButton";
import axios from "axios";
import { useAtom } from "jotai/react";
import { userIDAtom } from "@/store/userInfo";
import { cardInfo } from "@/data/card";

interface CardDetailData {
  lvl: number;
  hourlyIncome: number;
  nextLvlCost: number;
}

interface CardData {
  title: string;
  catagery: string;
  detail: CardDetailData;
  nextDetail: CardDetailData;
}
export interface FarmData {
  profitPerHour: number;
  timeLeft: Date;
  dailyCardPairChance: number;
  cardInfo: CardData[];
}

const Farm = () => {
  const [userID] = useAtom(userIDAtom)

  const [sort, setSort] = useState(0);
  const [chooseCard, setChooseCard] = useState<number[]>([]);
  const [cardImgs, setCardImgs] = useState<string[]>([]);
  const [render, setRender] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [dailyChance, setDailyChance] = useState(3);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify the type for error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hrIcome, setHrIncome] = useState(0)
  const [getData, setgetData] = useState<FarmData>();

  const initCardInfo = (data:FarmData) => {
    cardInfo.map((card) => {
      const cardDetails = data.cardInfo[card.id ].detail;
      const nextCardDetails = data.cardInfo[card.id ].nextDetail;
    
      if (cardDetails) {
        card.level = cardDetails.lvl;
        card.hourlyIncome = cardDetails.hourlyIncome;
        card.nextLevelCost = cardDetails.nextLvlCost;
      }
    
      if (nextCardDetails) {
        card.nextLevelHourlyIncome = nextCardDetails.hourlyIncome;
      }
      return card;
    });
    console.log("Farm--->>>", cardInfo)    
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FarmData>(
          `https://b702-52-68-113-84.ngrok-free.app/api/get-card-data/${userID}`,
          {
            headers: {
              Authorization: "Bearer your_token_here",
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "rio",
            },
          }
        );
        setgetData(response.data);
        setDailyChance(response.data.dailyCardPairChance)
        console.log("axios runing")
        setHrIncome(response.data.profitPerHour)
        initCardInfo(response.data)
        console.log(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred"); // Improved error handling
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rerender]);

  if (loading) return <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  ">Loading...</div>;
  if (error)
    return (
      <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  ">
        Error: {error}
      </div>
    );

    


  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="h-4">
        <Homebutton />
      </div>
      <InvitePool />
      <ButtonGroup data={getData ?? undefined} hrIcome={hrIcome} setRender={setRender} />
      <FindCard
        cardImgs={cardImgs}
        setCardImgs={setCardImgs}
        setRender={setRender}
        render={render}
        refresh={refresh}
        setRefresh={setRefresh}
        setChooseCard={setChooseCard}
        chooseCard={chooseCard}
        setDailyChance={setDailyChance}
        dailyChance={dailyChance}
      />
      <div className="overflow-scroll1 flex justify-center">
        <Tabs
          tabs={["NWS Ecosystem", "Gameplay/NFT"]}
          defaultTab="NWS Ecosystem"
          setSort={setSort}
        />
      </div>
      <CardList
        sort={sort}
        chooseCard={chooseCard}
        setChooseCard={setChooseCard}
        cardImgs={cardImgs}
        setCardImgs={setCardImgs}
        render={render}
        setRender={setRender}
        refresh={refresh}
        setRerender={setRerender}
        rerender={rerender}
        setRefresh={setRefresh}
        data={getData ?? undefined} 
        cardInfo={cardInfo}
      />
    </div>
  );
};

export default Farm;
