"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";

import { saveEnergy, saveTaps } from "@/hook/save";
import { curEnergyAtom, tapsAtom } from "@/store/save";
import { userIDAtom } from "@/store/userInfo";

interface navProp {
  imgSrc: string;
  navName: string;
}

const Nav: React.FC<navProp> = ({ imgSrc, navName }) => {
  const [taps, setTaps] = useAtom(tapsAtom);
  const [curEnergy] = useAtom(curEnergyAtom);
  const [userID] = useAtom(userIDAtom);

  const router = useRouter();

  const handleRouter = () => {
    saveTaps(taps, userID);
    saveEnergy(curEnergy, userID);
    setTaps(0);
    router.push(navName.toLowerCase());
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div
        className="flex flex-col justify-center items-center bg-[#685eab] w-[60px] h-[60px] rounded-full cursor-pointer"
        onClick={handleRouter}
      >
        <Image className="h-8 w-8" src={imgSrc} alt="" width={32} height={32} />
        <div className="text-white text-xs">{navName}</div>
      </div>
    </div>
  );
};

export default Nav;
