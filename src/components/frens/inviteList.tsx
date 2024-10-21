"use client"
// import { inviteData } from "@/data/inviteData";
import RankCard from "../ranklist/rankCard";
import { FriendsData } from "@/app/friends/page";

const InviteList = ({ inviteFriends }: { inviteFriends: FriendsData[] }) => {
  return (
    <div className="text-white flex flex-col">
      <div className="text-base font-semibold  ">
        Invite List({"0"})
      </div>
      <div className="flex flex-col gap-y-2">
        {inviteFriends ? (
          inviteFriends.map((item, idx) => (
            item.firstName && <RankCard
              key={idx}
              ranking={idx}
              firstName={item.firstName}
              lastName={item.lastName}
              imgSrc="/image/goldcoin.png"
              value={item.totalPoint}
              color="from-[#DF1147] to-[#ee4e78]"
            />
          ))
        ) : (
          <div className="bg-gradient-to-t from-[#DF1147] to-[#ee4e78] flex justify-center items-center py-1.5 px-3 mt-1 mr-1 h-[60px] rounded-xl w-full min-w-52 text-sm">
            You haven&apos;t invited any friends yet
          </div>
        )}
      </div>
    </div>
  );
};

export default InviteList;
