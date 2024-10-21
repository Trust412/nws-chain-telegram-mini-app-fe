/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { userIDAtom } from "@/store/userInfo";
import { useAtom } from "jotai";
import VerificationModal from "../modal/withdraw";
interface RewardData {
  currentPoint: number;
  currentCoin: number;
}

const Balances = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [userID] = useAtom(userIDAtom);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify the type for error
  const [getData, setgetData] = useState<RewardData>();
  // let getdata: GetData | undefined = undefined;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RewardData>(
          `https://b702-52-68-113-84.ngrok-free.app/api/get-rewards-data/${userID}`,
          {
            headers: {
              Authorization: "Bearer your_token_here",
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "rio",
            },
          }
        );
        setgetData(response.data);
        // console.log("sdf", response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred"); // Improved error handling
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  "></div>
    );
  if (error)
    return (
      <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  ">
        {/* Error: {error} */}
      </div>
    );

  const handleWithdraw = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <h2 className="text-base font-bold mb-2  ">Balances</h2>
      <div className="relative bg-gradient-to-t from-[#e30f2e] to-[#db1360] flex justify-between rounded-xl space-y-2 p-4">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex text-[#FFFFFF] items-center">
            <div className="w-28 max-[375px]:w-24 max-[375px]:text-xs">
              NWS Points
            </div>
            <div className="flex items-center">
              <Image
                src="/image/goldcoin.png"
                alt="NWS Points"
                width={20}
                height={20}
                className="mr-2"
              />
              <span>{getData?.currentPoint.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex text-[#FFFFFF]  items-center">
            <div className="w-28 max-[375px]:w-24 max-[375px]:text-xs ">
              $NWS Tokens
            </div>
            <div className="flex items-center">
              <Image
                src="/image/coin.png"
                alt="NWS Tokens"
                width={20}
                height={20}
                className="mr-2"
              />
              <span>{getData?.currentCoin.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <button
          className="absolute right-2 bottom-4 px-6 py-0.5 bg-[url('/image/buttonbg.jpg')] bg-cover rounded-full text-xs"
          onClick={handleWithdraw}
        >
          Withdraw
        </button>
      </div>
      <VerificationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Balances;
