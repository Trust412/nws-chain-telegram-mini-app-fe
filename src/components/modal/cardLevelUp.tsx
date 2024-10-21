"use client";

// import React, { useState } from 'react'
// import { X } from 'lucide-react'

interface CardLevelUpProps {
  imgSrc: string;
  title: string;
  description: string;
  hourlyIncome: number;
  nextLevelHourlyIncome: number;
  cost: number;
  level: number;
  onLevelUp: () => void;
  onClose: () => void;
}

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function CardLevelUp({
  imgSrc,
  title,
  description,
  hourlyIncome,
  nextLevelHourlyIncome,
  cost,
  level,
  onLevelUp,
  onClose,
}: CardLevelUpProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed top-0 z-10 bg-black bg-opacity-50 h-screen w-screen flex items-center justify-center -translate-x-4">
      <div
        className={`fixed bottom-0 bg-[#ED1147] rounded-t-xl border-t-4 border-yellow-400 w-full transform transition-transform duration-500 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-3xl text-white hover:text-gray-300 bg-purple-900 rounded-full p-1"
          aria-label="Close"
        >
          <Image src={"/image/close.svg"} alt="" width={24} height={24} />
        </button>
        <div className="p-6 flex flex-col items-center">
          <div className="pb-5">
            <Image className="rounded-xl border-2" src={imgSrc} alt="" width={88} height={88} />
            <div className="absolute right-1/2 translate-x-1/2 -translate-y-1/2 text-white bg-slate-900 rounded-full text-center leading-5 w-fit px-3 border">Lv {level}</div>
          </div>
          <div className="text-white text-2xl  ">{title}</div>
          <p className="text-white text-sm text-center mb-2">{description}</p>
          <h2 className="text-yellow-400 text-xl font-bold mb-4 text-center">
            Profit Per Hour
          </h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center bg-black rounded-full px-4">
            <Image src={"/image/goldcoin.png"} alt="" width={16} height={16}/>
              <span className="text-yellow-400 font-bold pl-1">{hourlyIncome}</span>
            </div>
            <div className="text-yellow-400 mx-2">{">>"}</div>
            {/* <ArrowRight className="text-yellow-400 mx-2" /> */}
            <div className="flex items-center bg-black rounded-full px-4">
              <Image src={"/image/goldcoin.png"} alt="" width={16} height={16}/>
              <span className="text-yellow-400 font-bold pl-1">{nextLevelHourlyIncome}</span>
            </div>
          </div>
          {/* <div className="flex text-center">
            <p className="text-white text-sm">Unlocking Condition:</p>
            <p className="text-blue-300 text-sm font-semibold">
              Future Vision Lv15
            </p>
          </div> */}
          <div
            onClick={onLevelUp}
            className="flex justify-center items-center w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl"
          >
            <Image className="w-6 h-6 mr-2" src={"/image/goldcoin.png"} alt="" width={24} height={24}/>
            <div className="text-3xl leading-7">{cost}</div>
            {/* {cost ? "Level Up" : "Claim"} */}
          </div>
        </div>
      </div>
    </div>
  );
}
