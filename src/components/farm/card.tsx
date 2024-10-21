"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cardInfo } from "@/data/card";
import CardLevelUP from "../modal/cardLevelUp";
import { FarmData } from "@/app/farm/page";
import axios from "axios";
import { userIDAtom } from "@/store/userInfo";
import { useAtom } from "jotai";
import NotEnoughPoint from "../modal/notenoughpoint";
import Success from "../modal/success";

interface CardProps {
  id: number;
  imgSrc: string;
  cardName: string;
  level: number;
  hourlyIncome: number;
  nextLevelCost: number;
  nextLevelHourlyIncome: number;
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
  data?: FarmData;
}

interface CardDataInfo {
  lvl: number;
  hourlyIncome: number;
  nextLvlCost: number;
}

interface CardData {
  currentLevel: CardDataInfo;
  nextLevel: CardDataInfo;
}

export default function Card({
  id,
  imgSrc,
  cardName,
  level,
  hourlyIncome,
  nextLevelCost,
  nextLevelHourlyIncome,
  chooseCard,
  setChooseCard,
  setCardImgs,
  cardImgs,
  render,
  setRender,
  refresh,
  setRerender,
  rerender,
}: // data
// setRefresh,
CardProps) {
  const [userID] = useAtom(userIDAtom);

  const [cardInfos, setCardInfos] = useState({
    lvl: level,
    hrIncome: hourlyIncome,
    nhrIncome: nextLevelHourlyIncome,
    nLCost: nextLevelCost,
  });

  const [isClick, setIsClick] = useState(false);
  const [style, setStyle] = useState("bg-[#FFC107]");

  const handleStyle = () => {
    console.log("--chooseCard->", chooseCard, isClick);
    const count = chooseCard.length + 1;
    // Toggle the isClick state
    const newClickState = !isClick;
    if (count <= 3) {
      setIsClick(newClickState);
    }
    // Set the style based on the new state
    if (newClickState) {
      if (chooseCard.length < 3) {
        setStyle("bg-[#5f6898]");
        console.log("====", "bg-[#5f6898]", newClickState, isClick);
        addCard();
      }
    } else {
      setStyle("bg-[#FFC107]");
      console.log("====", "bg-[#FFC107]", newClickState, isClick);
      removeCard();
    }
  };

  const addCard = () => {
    const currentlist = chooseCard;
    currentlist.push(id);
    // console.log("add1--->", currentlist);
    setChooseCard(currentlist);
    console.log("add2--->", currentlist, chooseCard);
    const currentImg = cardImgs;
    currentImg.push(cardInfo[id - 1].imgSrc);
    // console.log("cardInfo[id].imgSrc--->", cardInfo[id-1].imgSrc, id);
    setCardImgs(currentImg);
    // console.log("--->", currentImg, cardImgs);
    setRender(!render);
  };

  const removeCard = () => {
    const newlist: number[] = [];
    chooseCard.map((cardId) => {
      if (cardId !== id) newlist.push(cardId);
    });
    setChooseCard(newlist);
    const newImglist: string[] = [];
    cardImgs.map((cardImg) => {
      if (cardImg !== cardInfo[id - 1].imgSrc) newImglist.push(cardImg);
    });
    setCardImgs(newImglist);
    setRender(!render);
  };

  useEffect(() => {
    let isSelect = false;
    chooseCard.map((selected) => {
      if (selected === id) {
        isSelect = true;
        // setIsClick(true)
      }
    });
    // console.log("+++>>>11111", chooseCard, isClick, id);
    if (isSelect) {
      setIsClick(true);
      setStyle("bg-[#5f6898]");
      // console.log("+++>>>22222", isClick, id);
    } else {
      if (chooseCard.length >= 3) {
        // console.log("+++>>>33333", isClick, id);
        setStyle("bg-[#000000]");
      }
      // console.log("+++>>>44444", isClick, id);
      if (chooseCard.length < 3) setStyle("bg-[#FFC107]");
    }
    // console.log("+++>>>55555", isClick, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  useEffect(() => {
    setIsClick(false);
  }, [refresh]);

  //levelup modal
  const [isOpen, setIsOpen] = useState(false);

  const handleLevelUp = () => {
    axios
      .put<CardData>(
        `https://b702-52-68-113-84.ngrok-free.app/api/update/card/${userID}`,
        { cardId: id }
      )
      .then((res) => {
        if (res.data) {
          handleSuccess();
          setCardInfos({
            lvl: res.data.currentLevel.lvl,
            hrIncome: res.data.currentLevel.hourlyIncome,
            nhrIncome: res.data.nextLevel.hourlyIncome,
            nLCost: res.data.currentLevel.nextLvlCost,
          });
          console.log("id", id, res.data);
          setRender(!render);
          setRerender(!rerender);
        } else {
          handleNotEnoughPoint();
        }
      })
      .catch((err) => console.log(err));
    setIsOpen(false);
    // console.log("asdfasdfasdf", isOpen);
  };

  const levelUp = () => {
    setIsOpen(true);
  };

  // Success and failed Alert
  const [showSuccess, setShowSuccess] = useState(false);
  const [showNotEnoughPoint, setShowNotEnoughPoint] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true); // Show the Success component
    console.log(showSuccess);
    // Set a timer to hide the component after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  const handleNotEnoughPoint = () => {
    setShowNotEnoughPoint(true);
    console.log(showNotEnoughPoint);
    // Set a timer to hide the component after 3 seconds
    setTimeout(() => {
      setShowNotEnoughPoint(false);
    }, 3000);
  };

  return (
    <>
      <div className="relative">
        <div
          className="bg-gradient-to-t from-[#DF1147] to-[#ee4e78] rounded-lg flex pr-1 items-center justify-between w-full cursor-pointer"
          onClick={levelUp}
        >
          <div className="flex items-center space-x-2">
            <Image
              src={imgSrc}
              alt="Game Controller"
              width={80}
              height={80}
              className="text-white w-20 h-20 rounded-lg"
            />
            <div>
              <h2 className="text-white font-bold text-sm">
                {cardName} (LV{cardInfos.lvl})
              </h2>
              <div className="text-white">
                <div className="flex items-center">
                  <div className="w-24 text-xs 1text-[#227817]">
                    Hourly Income:
                  </div>
                  <div className="flex flex-nowrap items-center w-10 text-xs">
                    <Image
                      src="/image/goldcoin.png"
                      alt="Coin"
                      width={12}
                      height={12}
                      className="justify-items-start ml-1 mr-1 w-3 h-3"
                    />
                    {cardInfos.hrIncome}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-xs 1text-[#f66563]">
                    Next Level Cost:
                  </div>
                  <div className="flex flex-nowrap items-center w-10 text-xs">
                    <Image
                      src="/image/goldcoin.png"
                      alt="Coin"
                      width={12}
                      height={12}
                      className="justify-items-start ml-1 mr-1 w-3 h-3"
                    />
                    {cardInfos.nLCost}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className={`${style} text-[#2D2463] absolute right-1 top-0 self-start px-1 py-1 my-1 rounded font-bold text-[8px] w-[60px] min-[385px]:text-[10px]`}
          onClick={handleStyle}
        >
          {style === "bg-[#5f6898]" ? "Discard" : "Choose Card"}
        </button>
        {isOpen && (
          <CardLevelUP
            imgSrc={imgSrc}
            title={cardName}
            description={cardName}
            cost={cardInfos.nLCost}
            hourlyIncome={cardInfos.hrIncome}
            nextLevelHourlyIncome={cardInfos.nhrIncome}
            level={level}
            onLevelUp={handleLevelUp}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
      {showSuccess && <Success />}
      {showNotEnoughPoint && <NotEnoughPoint />}
    </>
  );
}
