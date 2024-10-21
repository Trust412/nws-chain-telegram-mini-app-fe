"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface LevelUpModalProps {
  imgSrc: string;
  title: string;
  description: string;
  cost: number;
  level: number;
  onLevelUp: () => void;
  onClose: () => void;
}


export default function LevelUpModal({
  imgSrc,
  title,
  description,
  cost,
  level,
  onLevelUp,
  onClose,
}: LevelUpModalProps) {
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
          <Image src={"/image/close.svg"} alt="" width={24} height={24} />
        </button>
        <div className="p-6 flex flex-col items-center">
          <Image src={imgSrc} alt="" width={88} height={88} />
          <div className="text-white text-2xl  ">{title}</div>
          <p className="text-white text-sm text-center mb-2">{description}</p>
          {level >= 0 ? (
            <div className="flex items-center justify-center gap-2 mb-4">
              <Image
                className="w-8 h-8"
                src={"/image/goldcoin.png"}
                alt=""
                width={32}
                height={32}
              />
              <h2 className="text-base font-bold text-white">
                {cost.toLocaleString()}/Lv{level}
              </h2>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 mb-4">
              <Image
                className="w-3 h-4"
                src={"/image/energy.png"}
                alt=""
                width={24}
                height={24}
              />
              <div>{cost}/3</div>
            </div>
          )}
          <button
            onClick={onLevelUp}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl"
          >
            { level >= 0 ? "Level Up" : "Claim 1"}
          </button>
        </div>
      </div>
    </div>
  );
}
