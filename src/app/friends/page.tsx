"use client"
import Homebutton from "@/components/button/homeButton";
import ExtraBonuses from "@/components/frens/extraBonuses";
import FrensTop from "@/components/frens/frenstop";
import InviteFrens from "@/components/frens/InviteFrens";
import InviteList from "@/components/frens/inviteList";
import InvitePool from "@/components/invitepool/invitepool";
import { userIDAtom } from "@/store/userInfo";
import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export interface FriendsData {
  lastName: string
  firstName: string
  totalPoint: number
}
interface InviteData {
  inviteLink: string
  friends: FriendsData[]
}

const Frens = () => {
  const [ userID ] = useAtom(userIDAtom)
  

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify the type for error
  const [getData, setgetData] = useState<InviteData>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<InviteData>(
          `https://b702-52-68-113-84.ngrok-free.app/api/get-friend-data/${userID}`,
          {
            headers: {
              Authorization: "Bearer your_token_here",
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning" : "rio"
            },
          }
        );
        setgetData(response.data);
        console.log("sdf", response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred"); // Improved error handling
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  ">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <Homebutton/>
      <FrensTop/>
      <InvitePool/>
      <InviteFrens inviteLink={(getData?.inviteLink as string | undefined) ?? ''} />
      <ExtraBonuses/>
      <InviteList inviteFriends={getData?.friends ?? {} as FriendsData[]} />
    </div>
  );
};


export default Frens;
