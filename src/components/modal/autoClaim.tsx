"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { pointCal } from "@/utils/pointcal";

interface AutoClaimProps {
  claim: number;
  onLevelUp: () => void;
  onClose: () => void;
}

export default function AutoClaim({
  claim,
  onLevelUp,
  onClose,
}: AutoClaimProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed top-0 bg-black bg-opacity-50 h-screen w-screen flex items-center justify-center">
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
          <Image src="/image/close.svg" alt="Close" width={24} height={24} />
        </button>
        <div className="p-6 flex flex-col items-center">
          <Image className="mb-5" src="/image/goldcoin.png" alt="Gold Coin" width={88} height={88} />
          <div className="text-white text-2xl mb-2  ">{pointCal(claim)} Points</div>
          <p className="text-white text-sm text-center mb-10">
            Congratulations, you can claim the mine earning from the hourly profit.
          </p>
          <div className="flex w-full items-center justify-center gap-2 mb-4">
            <button
              onClick={onLevelUp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl"
            >
              Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
