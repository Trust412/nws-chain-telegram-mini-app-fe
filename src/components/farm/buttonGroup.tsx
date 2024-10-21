/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { FarmData } from "@/app/farm/page";
import SecondaryButton from "@/components/button/secondaryButton";
import { pointCal } from "@/utils/pointcal";
import { useEffect, useState } from "react";

interface GroupData {
  hrIcome: number;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  data?: FarmData
}

const ButtonGroup: React.FC<GroupData> = ({ data, hrIcome }) => {
  
  
  const groupData = [
    {
      id: 1,
      title: "Profit Per Hour",
      iconImg: "/image/goldcoin.png",
      content: data ? pointCal(hrIcome || 0) : "0", // Convert profitPerHour to string
    },
    { id: 2, title: "Time Left", iconImg: "", content: "12:12:12" },
    {
      id: 3,
      title: "Card Reward",
      iconImg: "/image/goldcoin.png",
      content: "2.00M",
    },
  ];
  
  useEffect(() => {
    // groupData[0].content = 
    console.log("ppppppppp", data?.profitPerHour, hrIcome)
  }, [hrIcome])
  

  useEffect(() => {
    if (data?.timeLeft) {
      const initialSeconds = secondCal(new Date(data.timeLeft));
      setSeconds(initialSeconds);
    }
  }, [data?.timeLeft]);

  const secondCal = (curtime: Date): number => {
    const currentDate: Date = new Date(curtime);

    // Create a date object for 24:00 (midnight of the next day)
    const midnight: Date = new Date(currentDate);
    midnight.setDate(midnight.getDate() + 1); // Move to the next day
    midnight.setHours(0, 0, 0, 0); // Set to 00:00:00.000

    // Calculate the difference in milliseconds
    const differenceInMillis: number = midnight.getTime() - currentDate.getTime();

    // Convert the difference to seconds
    const differenceInSeconds: number = Math.floor(differenceInMillis / 1000);

    return differenceInSeconds; // Return the difference in seconds
  };

  const [seconds, setSeconds] = useState(1000);
  const [isActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0)); // Prevent negative seconds
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (sec: number): string => {
    const hours = String(Math.floor(sec / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const seconds = String(sec % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex gap-2">
      {groupData.map((item) => (
        <SecondaryButton
          key={item.id}
          title={item.title}
          iconImg={item.iconImg}
          content={item.id === 2 ? formatTime(seconds) : item.content}
        />
      ))}
    </div>
  );
};

export default ButtonGroup;
