/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import RankCard from "./rankCard";
import axios from "axios";
import { userFirstNameAtom, userLastNameAtom } from "@/store/userInfo";
import { userIDAtom } from "@/store/userInfo";
import { useAtom } from "jotai";

interface RankListProp {
  sort: number;
}

interface TopUserByPointsData {
  id: string;
  firstName: string;
  lastName: string;
  totalPoint: number;
}

interface TopUsersByInvitesData {
  id: string;
  firstName: string;
  lastName: string;
  totalInvites: number;
}

interface RankData {
  myPoint: number;
  myInvites: number;
  myPointRank: number;
  myInviteRank: number;
  topUsersByPoints: TopUserByPointsData[];
  topUsersByInvites: TopUsersByInvitesData[];
}

const RankList: React.FC<RankListProp> = ({ sort }) => {
  const [userID] = useAtom(userIDAtom);
  const [userFirstName] = useAtom(userFirstNameAtom);
  const [userLastName] = useAtom(userLastNameAtom);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [getData, setGetData] = useState<RankData | null>(null); // Initialize as null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RankData>(
          `https://b702-52-68-113-84.ngrok-free.app/api/get-rank-data/${userID}`,
          {
            headers: {
              Authorization: "Bearer your_token_here",
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "rio",
            },
          }
        );
        setGetData(response.data);
        console.log(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-white font-bold text-2xl text-nowrap fixed left-1/2 top-1/2 -translate-x-1/2  ">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex flex-col gap-4">
      <div className="text-white">
        <div>My Rank</div>
        {sort ? (
          <RankCard
            ranking={getData?.myInviteRank || 0}
            firstName={userFirstName}
            lastName={userLastName}
            imgSrc="/image/frens.png"
            value={getData?.myInvites || 0}
            color="from-[#bc741c] to-[#f8b647]"
          />
        ) : (
          <RankCard
            ranking={getData?.myPointRank || 0}
            firstName={userFirstName}
            lastName={userLastName}
            imgSrc="/image/goldcoin.png"
            value={getData?.myPoint || 0}
            color="from-[#bc741c] to-[#f8b647]"
          />
        )}
      </div>
      <div className="text-white flex flex-col gap-2">
        <div>Rank</div>
        {sort ? (
          getData?.topUsersByInvites?.map((item, idx) => (
            item.firstName && (
              <RankCard
                key={item.id}
                ranking={idx} // Adjust ranking to start from 1
                firstName={item.firstName}
                lastName={item.lastName}
                imgSrc="/image/frens.png"
                value={item.totalInvites}
                color="from-[#e30f2e] to-[#db1360]"
              />
            )
          )) || <div>No users found</div>
        ) : (
          getData?.topUsersByPoints?.map((item, idx) => (
            item.firstName && (
              <RankCard
                key={item.id}
                ranking={idx} // Adjust ranking to start from 1
                firstName={item.firstName}
                lastName={item.lastName}
                imgSrc="/image/goldcoin.png"
                value={item.totalPoint}
                color="from-[#e30f2e] to-[#db1360]"
              />
            )
          )) || <div>No users found</div>
        )}
      </div>
    </div>
  );
};

export default RankList;
