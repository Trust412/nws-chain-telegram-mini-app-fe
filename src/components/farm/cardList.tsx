"use client"
// import { cardInfo } from "@/data/card";
import Card from "./card";
import { FarmData } from "@/app/farm/page";
// import { useEffect } from "react";

interface InitCardData {
  id: number
  imgSrc: string
  cardName: string
  level: number
  hourlyIncome: number
  nextLevelCost: number
  nextLevelHourlyIncome: number
}

interface CardListProp {
  sort: number;
  chooseCard: number[];
  setChooseCard: React.Dispatch<React.SetStateAction<number[]>>;
  cardImgs: string[];
  setCardImgs: React.Dispatch<React.SetStateAction<string[]>>;
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  rerender: boolean;
  setRerender: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  data?: FarmData
  cardInfo: InitCardData[]
}

const CardList: React.FC<CardListProp> = ({
  sort,
  setChooseCard,
  chooseCard,
  setCardImgs,
  cardImgs,
  render,
  setRender,
  rerender,
  setRerender,
  refresh,
  setRefresh,
  data,
  cardInfo
}) => {
  // useEffect(() => {
  //   cardInfo.map((card) => {
  //     const cardDetails = data?.cardInfo[card.id ]?.detail;
  //     const nextCardDetails = data?.cardInfo[card.id ]?.nextDetail;
    
  //     if (cardDetails) {
  //       card.level = cardDetails.lvl;
  //       card.hourlyIncome = cardDetails.hourlyIncome;
  //       card.nextLevelCost = cardDetails.nextLvlCost;
  //     }
    
  //     if (nextCardDetails) {
  //       card.nextLevelHourlyIncome = nextCardDetails.hourlyIncome;
  //     }
    
  //     return card;
  //   });
  //   console.log("Farm--->>>", cardInfo)    
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])  

  return (
    <div className="flex flex-col gap-2">
      {cardInfo.map(
        (card) =>
          card.id > 10 * sort &&
          card.id <= 10 * (sort + 1) && (
            <Card
              key={card.id}
              id={card.id}
              imgSrc={card.imgSrc}
              cardName={card.cardName}
              level={card.level}
              hourlyIncome={card.hourlyIncome}
              nextLevelCost={card.nextLevelCost}
              nextLevelHourlyIncome={card.nextLevelHourlyIncome}
              chooseCard={chooseCard}
              setChooseCard={setChooseCard}
              cardImgs={cardImgs}
              setCardImgs={setCardImgs}
              render={render}
              setRender={setRender}
              setRerender={setRerender}
              rerender={rerender}
              refresh={refresh}
              setRefresh={setRefresh}
              data={data ?? undefined} 
            />
          )
      )}
    </div>
  );
};

export default CardList;
