"use client"
import { useEffect, useState } from "react";
import { GetData } from "@/app/home/page";
import SecondaryButton from "../button/secondaryButton";
import { pointCal } from "@/utils/pointcal";

interface TopSlideProps {
  data?: GetData;
}

const TopSlide: React.FC<TopSlideProps> = ({ data }) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive] = useState<boolean>(true);

  useEffect(() => {
    if (data?.serverTime) {
      const initialSeconds = secondCal(new Date(data.serverTime));
      setSeconds(initialSeconds);
    }
  }, [data?.serverTime]);

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

  const secondCal = (curtime: Date): number => {
    const currentDate: Date = new Date(curtime);

    // Create a date object for 24:00 (midnight of the next day)
    const midnight: Date = new Date(currentDate);
    midnight.setDate(midnight.getDate() + 1); // Move to the next day
    midnight.setHours(0, 0, 0, 0); // Set to 00:00:00.000

    // Calculate the difference in milliseconds
    const differenceInMillis: number =
      midnight.getTime() - currentDate.getTime();

    // Convert the difference to seconds
    const differenceInSeconds: number = Math.floor(differenceInMillis / 1000);

    return differenceInSeconds; // Return the difference in seconds
  };

  return (
    <div className="flex gap-2">
      {/* <div onClick={}> */}
        <SecondaryButton
          title="Daily Check In"
          iconImg="/image/gift.png"
          content={data?.isDayCountEnable ? formatTime(seconds) : ""}
          checkImg={data?.isDayCountEnable ? "" : "/image/check.png"}
        />
      {/* </div >
      <div onClick={}> */}
        <SecondaryButton
          title="Profit per Hour >"
          iconImg="/image/goldcoin.png"
          content={data?.profitPerHour ? pointCal(data.profitPerHour) : "0"}
        />
      {/* </div> */}
      <SecondaryButton
        title="Total Earned >"
        iconImg="/image/goldcoin.png"
        content={data?.totalPoint ? pointCal(data.totalPoint) : "0"}
      />
    </div>
  );
};

export default TopSlide;
