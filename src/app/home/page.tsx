/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import dynamic from "next/dynamic";
// const Home = dynamic(() => import("@/app/home/page"), { ssr: false });

import axios from "axios";
import Content from "@/components/content/content";
import Footer from "@/components/footer/footer";
import Invite from "@/components/invitepool/invitepool";
import TopSlide from "@/components/topsilde/topslide";
import { useEffect, useState } from "react";
// import { useTelegram } from "@/hook/hook";
import { useAtom } from "jotai";
import {
  startParamAtom,
  userFirstNameAtom,
  userLastNameAtom,
  userNameAtom,
  userIDAtom,
} from "@/store/userInfo";

// import AutoClaim from "@/components/modal/autoClaim";

export interface GetData {
  totalPoint: number;
  currentPoint: number;
  profitPerHour: number;
  curEnergy: number;
  maxEnergy: number;
  recoverSpeed: number;
  multiValue: number;
  updatedAt: string;
  dayCount: number;
  isDayCountEnable: boolean;
  serverTime: Date;
  dT: number;
  rank: number;
}

function Home() {
  const [userID, setUserID] = useAtom(userIDAtom);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [userFirstName, setUserFirstName] = useAtom(userFirstNameAtom);
  const [userLastName, setUserLastName] = useAtom(userLastNameAtom);
  const [userName, setUserName] = useAtom(userNameAtom);
  const [startParam, setStartParam] = useAtom(startParamAtom);

  // const { user, start_param } = useTelegram();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [getData, setGetData] = useState<GetData>();

  // const [isOpen, setIsOpen] = useState(false);
  // const [autoClaim, setAutoClaim] = useState(0);

  useEffect(() => {
    console.log("useTelegram");
    console.log("process.env.APP_API_URL", process.env.APP_API_URL)
    function initTg() {
      if (
        typeof window !== "undefined" &&
        (window as any).Telegram &&
        (window as any).Telegram.WebApp
      ) {
        const tgData = (window as any).Telegram.WebApp;
        console.log("Telegram WebApp is set");
        console.log("--->", tgData);
        setUserID(tgData.initDataUnsafe.user.id.toString());
        setUserFirstName(tgData.initDataUnsafe.user.first_name);
        setUserLastName(tgData.initDataUnsafe.user.last_name);
        setUserName(tgData.initDataUnsafe.user.username);
        setStartParam("");
        // console.log("MY INfo-------->",tgData.initDataUnsafe.user.id.toString(),tgData.initDataUnsafe.user.first_name);
        
        const fetchData = async () => {
          try {
            // const tgID = "6739845345345"; // Ensure this is set correctly
            const response = await axios.get<GetData>(
              `https://b702-52-68-113-84.ngrok-free.app/api/get-home-data/${tgData.initDataUnsafe.user.id.toString()}`,
              {
                headers: {
                  Authorization: "Bearer your_token_here",
                  "Content-Type": "application/json",
                  "ngrok-skip-browser-warning": "rio",
                },
              }
            );
            setGetData(response.data);
            console.log(response.data);
          } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
          } finally {
            setLoading(false);
          }
        };

        axios
          .post(
            `https://b702-52-68-113-84.ngrok-free.app/api/get-user/${tgData.initDataUnsafe.user.id.toString()}`,
            {
              userName: tgData.initDataUnsafe.user.username,
              firstName: tgData.initDataUnsafe.user.first_name,
              lastName: tgData.initDataUnsafe.user.last_name,
              start_param: "",
            }
          )
          .then((res) => {
            console.log("register", res.data, process.env.APP_API_URL)
            fetchData();
          })
          .catch((err) => console.log(err));


      } else {
        console.log("Telegram WebApp is undefined, retrying…");
        setTimeout(initTg, 500);
      }
    }
    initTg();
    console.log("info", userID, userFirstName, userLastName, userName, startParam)
  }, []);

  // const handleAutoClaim = () => {
  //   setIsOpen(false);
  // };

  if (loading) return <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  ">Loading...</div>;
  if (error) {
    return (
      <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  ">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="rounded-2xl h-full w-full pb-20">
      <div className="p-4">
        <TopSlide data={getData ?? undefined} />
        <Invite />
        <Content data={getData ?? undefined} />
      </div>
      <div className="flex justify-center items-center">
        <Footer />
      </div>
      {/* <div className="bg-white" onClick={() => setIsOpen(true)}>Claim</div> */}
      {/* {isOpen && (
        <AutoClaim
          claim={autoClaim}
          onLevelUp={handleAutoClaim}
          onClose={() => setIsOpen(false)}
        />
      )} */}

    </div>
  );
}

export default Home;
