/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import ProgressBar from "../progressbar/progressbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GetData } from "@/app/home/page";
// import axios from "axios";
import { useAtom } from "jotai";
import { curEnergyAtom, curPointAtom, tapsAtom } from "@/store/save";

const Content = ({ data }: { data?: GetData | undefined }) => {
  const router = useRouter();

  const [point, setPoint] = useState(data?.currentPoint || 0);
  let initenergy =
    Number(data?.curEnergy) +
    Math.floor(Number(data?.dT)) * Number(data?.recoverSpeed);
  if (initenergy > Number(data?.maxEnergy))
    initenergy = Number(data?.maxEnergy);
  console.log(
    "CALA energy",
    initenergy,
    "=",
    data?.curEnergy,
    Math.floor(data?.dT || 0),
    data?.recoverSpeed
  );
  const [energy, setEnergy] = useState(initenergy);
  const [multivalue] = useState(data?.multiValue || 0);
  const [maxEnergy] = useState(data?.maxEnergy || 500);
  const [speed] = useState(data?.recoverSpeed || 1);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  const [curPoint, setCurPoint] = useAtom(curPointAtom);
  const [curEnergy, setCurEnergy] = useAtom(curEnergyAtom);
  const [taps, setTaps] = useAtom(tapsAtom);

  useEffect(() => {
    setCurPoint(data?.currentPoint || 0);
    setCurEnergy(initenergy);
  }, []);
  // console.log("ddd", curEnergy, curPoint)

  useEffect(() => {
    console.log("ddd", curEnergy, curPoint, taps);
  }, [point]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEnergy((prevEnergy) => {
        const newEnergy = prevEnergy + speed;
        return newEnergy > maxEnergy ? maxEnergy : newEnergy;
      });
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [maxEnergy, speed]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    incPoint()
    if (energy < multivalue) return; // Prevent clicking if not enough energy

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  const incPoint = () => {
    if (energy >= multivalue) {
      setPoint((prevPoint) => prevPoint + multivalue);
      setEnergy((prevEnergy) => Math.max(prevEnergy - multivalue, 0));
      setCurPoint(point);
      setCurEnergy(energy);
      setTaps((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-2">
      <div className="flex">
        <Image
          className="h-8 w-8 mr-3"
          src="/image/goldcoin.png"
          alt="Gold Coin"
          width={32}
          height={32}
        />
        <div className="text-white text-[32px] leading-8 font-bold  ">
          {point.toLocaleString()}
        </div>
      </div>
      <div
        className="rounded-full bg-slate-900 flex justify-between items-center gap-1 w-fit px-3 py-1.5 my-1.5 cursor-pointer"
        onClick={() => router.push("/rank")}
      >
        <Image src="/image/cup.png" alt="Cup" width={12} height={12} />
        <div className="text-white text-sm">{data ? (data.rank >= 100 ? "99+" : data.rank ) : "99+"} {">"}</div>
      </div>
      <div className="relative no-text-cursor">
        <Image
          className="rounded-full active:scale-105 duration-100 cursor-pointer w-52 h-52 bg-transparent"
          style={{
            boxShadow: "0px 0px 100px 0px rgba(255, 0, 0, 1)",
          }}
          src="/image/coin.png"
          alt="Coin"
          width={160}
          height={160}
          onClick={handleClick}
        />
        {clicks.map((click) => (
          <div
            key={click.id}
            className="absolute text-white text-3xl font-bold opacity-0"
            style={{
              top: `${click.y - 42}px`,
              left: `${click.x - 28}px`,
              animation: `float 1s ease-out`,
            }}
            onAnimationEnd={() => handleAnimationEnd(click.id)}
          >
            {multivalue}
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center items-center gap-4 py-3">
        <div className="w-1/4 flex justify-end">
          <Image className="w-3 h-4" src="/image/energy.png" alt="Energy" width={12} height={12} />
        </div>
        <div className="w-1/2">
          <ProgressBar progress={(energy * 100) / maxEnergy} />
        </div>
        <div className="text-white text-base w-1/4">
          {energy}/{maxEnergy}
        </div>
      </div>
    </div>
  );
};

export default Content;
