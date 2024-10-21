/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import AccountVerification from "@/components/accountverity/accountVerification";
import Homebutton from "@/components/button/homeButton";
import Dailytask from "@/components/dailytask/dailytask";
import SocialTask from "@/components/socialtask/socialtask";
import { userIDAtom } from "@/store/userInfo";
import axios from "axios";
import { useAtom } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Revenue {
  point: number;
  coin: number;
}

export interface TaskData {
  revenue: Revenue;
  // _id: string;
  id: number;
  title: string;
  category: string;
  content: string;
  image: string;
  link: string;
  // createdAt: string;
  // updatedAt: string;
}

export interface QuestData {
  taskReward: number;
  dailyReward: number;
  completedTasks: number[];
  tasks: TaskData[];
  quest: number;
}

const Quest = () => {
  const [ userID ] = useAtom(userIDAtom)

  const [render, serRender] = useState(false)

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify the type for error
  const [getData, setgetData] = useState<QuestData>();
  // let getdata: GetData | undefined = undefined;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<QuestData>(
          `https://b702-52-68-113-84.ngrok-free.app/api/get-task-data/${userID}`,
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
  }, [render]);
  

  if (loading) return <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  ">Loading...</div>;
  if (error)
    return (
      <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  ">
        Error: {error}
      </div>
    );

  return (
    <div className="flex flex-col rounded-2xl w-full p-4 gap-4">
      <Homebutton />
      <div className="flex flex-col justify-center items-center">
        <Image
          className="w-[180px] h-[180px]"
          src={"/image/coin.svg"}
          alt=""
          width={180}
          height={180}
        />
        <div className="text-white text-2xl  ">Quest</div>
        <div className="relative flex justify-center items-center w-1/3 p-0.5 mt-2 border border-blue-800 rounded-full bg-slate-800">
          <Image
            className="absolute left-2 w-5 h-5"
            src={"/image/coin.svg"}
            alt=""
            width={20}
            height={20}
          />
          <div className="text-white">{getData?.quest}</div>
        </div>
      </div>
      <Dailytask dailyReward={getData?.dailyReward ?? 0}/>
      <AccountVerification 
        tasks={getData?.tasks ?? []} 
        completedTasks={getData?.completedTasks ?? []}
        render={render}
        setRender={serRender}
      />
      <SocialTask 
        tasks={getData?.tasks ?? []} 
        completedTasks={getData?.completedTasks ?? []}
        render={render}
        setRender={serRender}
      />
    </div>
  );
};

export default Quest;
