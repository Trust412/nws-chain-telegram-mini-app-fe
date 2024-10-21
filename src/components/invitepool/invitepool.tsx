"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";

import { saveEnergy, saveTaps } from "@/hook/save";
import { curEnergyAtom, tapsAtom } from "@/store/save";
import { userIDAtom } from "@/store/userInfo";

const InvitePool = ({ title }: { title?: string }) => {
  const [taps, setTaps] = useAtom(tapsAtom);
  const [curEnergy] = useAtom(curEnergyAtom);
  const [userID] = useAtom(userIDAtom);

  const router = useRouter();

  const handleRouter = () => {
    saveTaps(taps, userID);
    saveEnergy(curEnergy, userID);
    setTaps(0);
    router.push("friends");
  };
  return (
    <div onClick={handleRouter}>
      { title && <h2 className="text-[#d5a400] text-xl font-bold mb-2  ">
        {title}
      </h2>}
      <Image
        className="w-full rounded-xl mt-2"
        src={"/image/invitepool.png"}
        alt=""
        width={560}
        height={95}
      />
    </div>
  );
};

export default InvitePool;
