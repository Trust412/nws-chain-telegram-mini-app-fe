/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useEffect, useState } from "react";
import QuestionIcon from "./qeustioncard";
import axios from "axios";
import { userIDAtom } from "@/store/userInfo";
import { useAtom } from "jotai";
import OperationResult from "../modal/result";

interface FindCardProp {
  cardImgs: string[];
  setCardImgs: React.Dispatch<React.SetStateAction<string[]>>;
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setChooseCard: React.Dispatch<React.SetStateAction<number[]>>;
  chooseCard: number[];
  setDailyChance: React.Dispatch<React.SetStateAction<number>>;
  dailyChance: number;
}

const FindCard: React.FC<FindCardProp> = ({
  cardImgs,
  setCardImgs,
  render,
  setRender,
  refresh,
  setRefresh,
  setChooseCard,
  chooseCard,
  setDailyChance,
  dailyChance,
}) => {
  const [userID] = useAtom(userIDAtom);

  const [style, setStyle] = useState("bg-[#959595]");

  const handlerefresh = async () => {
    if (style === "bg-[#437cd8]" && dailyChance > 0) {
      axios
        .put(
          `https://b702-52-68-113-84.ngrok-free.app/api/update/card-reward/${userID}`,
          { cardpair: chooseCard }
        )
        .then((res) => {
          if (res.data.length === 3) {
            handleSuccess();
            setDailyChance(0)
            console.log(res.data);
          } else {
            handleFailed();
            console.log(res.data);
          }
        })
        .catch((err) => console.log(err));
      console.log("check card", chooseCard);
      setCardImgs([]);
      setRender(!render);
      const newRefresh = !refresh;
      setRefresh(newRefresh);
      setChooseCard([]);
      setDailyChance((dailyChance = dailyChance - 1));
    }
  };
  //Failed,You have 1 time left
  useEffect(() => {
    if (chooseCard.length === 3 && dailyChance > 0) {
      setStyle("bg-[#437cd8]");
    } else {
      setStyle("bg-[#959595]");
    }
    // console.log("3333", chooseCard.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

    // Success and failed Alert
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailed, setShowFailed] = useState(false);
  
    const handleSuccess = () => {
      setShowSuccess(true); // Show the Success component
      console.log(showSuccess);
      // Set a timer to hide the component after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    };
    
    const handleFailed = () => {
      setShowFailed(true); // Show the Failed component
      console.log(showFailed);
      // Set a timer to hide the component after 3 seconds
      setTimeout(() => {
        setShowFailed(false);
      }, 3000);
    };

  return (
    <div className="flex flex-col items-center text-white text-xs">
      <div>Find 3 correct cards to claim 2.00M Game Points</div>
      <div className="flex gap-4 my-4">
        <QuestionIcon cardImg={cardImgs[0]} />
        <QuestionIcon cardImg={cardImgs[1]} />
        <QuestionIcon cardImg={cardImgs[2]} />
      </div>
      <div className="relative w-5/6">
        <div className="absolute -right-2 top-0 w-5 h-5 bg-[#f40000] rounded-full flex justify-center text-center">
          {dailyChance}
        </div>
        <div
          className={`${style} rounded-lg px-14 py-2 text-center cursor-pointer`}
          onClick={handlerefresh}
        >
          {style === "bg-[#437cd8]" ? "Check Cards" : "Please choose 3 cards"}
        </div>
      </div>
      {showSuccess && <OperationResult text="Success"/>}
      {showFailed && <OperationResult text={ dailyChance === 1 ? `Wrong. You have 1 chance left` : `Wrong. You have ${dailyChance} chances left`}/>}
    </div>
  );
};

export default FindCard;
