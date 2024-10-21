/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Homebutton from "@/components/button/homeButton";
import { rewardDays } from "@/data/dailyreward";
import { userIDAtom } from "@/store/userInfo";
import { useAtom } from "jotai";
import Success from "@/components/modal/success";
import Failed from "@/components/modal/failed";
import DailyRewardClaim from "@/components/modal/dailyrewardclaim";

interface DailyRewardData {
  dayCount: number;
  isDayCountEnable: boolean;
  currentDate: Date;
}

export default function DailyReward() {
  const [render, setRender] = useState(true);
  const [userID] = useAtom(userIDAtom);
  //success and failed alert state
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  //claim modal
  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify the type for error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [getData, setgetData] = useState<DailyRewardData>();

  const fetchData = async () => {
    try {
      const response = await axios.get<DailyRewardData>(
        `https://b702-52-68-113-84.ngrok-free.app/api/get-dailyreward-data/${userID}`,
        {
          headers: {
            Authorization: "Bearer your_token_here",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "rio",
          },
        }
      );
      setgetData(response.data);
      // console.log(response.data);
      rewardDays.map((item, idx) => {
        if (idx < response.data.dayCount) {
          item.isCollected = true;
        } else {
          item.isCollected = false;
        }
        if (idx === response.data.dayCount) {
          item.isRewardEnable = response.data.isDayCountEnable;
        } else {
          item.isRewardEnable = false;
        }
        // const temp = enable
        // temp[response.data.dayCount +] = response.data.isDayCountEnable
        // setEnable(temp)
        return item; // Ensure to return the item for the map function
      });
      // console.log("response", response.data, rewardDays);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred"); // Improved error handling
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("runing daily reward", render);
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  ">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  ">
        Error: {error}
      </div>
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const handleClaim = () => {
    axios
      .put(
        `https://b702-52-68-113-84.ngrok-free.app/api/update/daily-data/daycount/${userID}`
      )
      .then((res) => {
        if (res.data) {
          handleSuccess();
          const temp = getData;
          if (temp) {
            temp.dayCount = temp.dayCount + 1;
            temp.isDayCountEnable = false;
          } else {
            handleFailed();
          }
          setgetData(temp);
          // console.log("axios", temp);
          // rewardDays.map((item) => {

          //     if(item.day === getData?.dayCount)
          // })
          fetchData();
          setRender(false);
        }
      })
      .catch((err) => console.log(err));
    setIsOpen(false);
  };

  // Success and failed Alert

  const handleSuccess = () => {
    setShowSuccess(true); // Show the Success component
    console.log(showSuccess);
    // Set a timer to hide the component after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  const handleFailed = () => {
    setShowFailed(true);
    console.log(showFailed);
    // Set a timer to hide the component after 3 seconds
    setTimeout(() => {
      setShowFailed(false);
    }, 3000);
  };

  //claim modal

  const claim = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center p-4">
        <Homebutton />
        <div className="rounded-3xl pt-6 max-w-md w-full">
          <div className="flex flex-col items-center justify-center mb-4">
            <Image
              src="/image/calendar.png"
              alt="Calendar Icon"
              width={88}
              height={88}
              className="mr-2"
            />
            <h1 className="text-2xl font-bold text-white  ">
              Daily Reward
            </h1>
          </div>
          <p className="text-center text-white mb-6">
            Acquire coins for logging into the game daily without skipping
          </p>
          <div className="grid grid-cols-3 gap-x-4 gap-y-3">
            {rewardDays.map((reward) => (
              <div key={reward.day} className="flex flex-col">
                <div className="text-sm text-center text-[#B4A5FF] mb-2">
                  {reward.isBigDay ? "BIG DAY" : `Day ${reward.day}`}
                </div>
                <div
                  key={reward.day}
                  className={`bg-[#5746A5] rounded-xl p-4 flex flex-col items-center justify-center relative ${
                    reward.isBigDay ? "col-span-1 row-span-1" : ""
                  }`}
                >
                  <Image
                    src={"/image/goldcoin.png"}
                    alt=""
                    width={50}
                    height={50}
                  />
                  <div className="text-white font-bold">{reward.amount}</div>
                  {reward.isCollected && (
                    <div className="absolute -top-1 -right-1">
                      <Image
                        src={"/image/check.png"}
                        alt=""
                        width={24}
                        height={24}
                      />
                    </div>
                  )}
                </div>
                {reward.isRewardEnable && render && (
                  <>
                    <div
                      className="text-white text-center bg-[#4db600] rounded-full mx-4 mt-1 cursor-pointer"
                      onClick={claim}
                    >
                      claim
                    </div>
                    {isOpen && (
                      <DailyRewardClaim
                        reward={reward.amount}
                        onClaim={handleClaim}
                        onClose={() => setIsOpen(false)}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        {showSuccess && <Success />}
        {showFailed && <Failed />}
      </div>
    </>
  );
}
