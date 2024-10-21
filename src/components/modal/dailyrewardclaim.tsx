"use client";

interface DailyRewardClaimProps {
  reward: string;
  onClaim: () => void;
  onClose: () => void;
}

import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function DailyRewardClaim({
  reward,
  onClaim,
  onClose,
}: DailyRewardClaimProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-10 bg-black bg-opacity-50 h-screen w-screen flex items-center justify-center">
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
          <div className="text-white text-2xl  ">
            Claim Check-In Reward
          </div>
          <div className="flex justify-center items-center mt-10 mb-5 rounded-md bg-[#3a115c] w-32 h-32">
            <Image
              className="rounded-full w-20 h-20"
              src={"/image/goldcoin.png"}
              alt=""
              width={80}
              height={80}
            />
          </div>
          <p className="text-white text-xl text-center mb-4">{reward} Points</p>
          <div
            onClick={onClaim}
            className="flex justify-center items-center w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl"
          >
            <div className="text-3xl leading-7">Claim</div>
          </div>
        </div>
      </div>
    </div>
  );
}
