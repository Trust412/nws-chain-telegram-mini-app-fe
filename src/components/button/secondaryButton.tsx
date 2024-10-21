"use client";
import { saveEnergy, saveTaps } from "@/hook/save";
import { curEnergyAtom, tapsAtom } from "@/store/save";
import { userIDAtom } from "@/store/userInfo";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface secondaryButtonProp {
  title: string;
  iconImg: string;
  content: string;
  checkImg?: string;
}

const SecondaryButton: React.FC<secondaryButtonProp> = ({
  title,
  iconImg,
  content,
  checkImg,
}) => {
  const [taps, setTaps] = useAtom(tapsAtom);
  const [curEnergy] = useAtom(curEnergyAtom);

  const [userID] = useAtom(userIDAtom);
  const router = useRouter();
  const handleNavigate = () => {
    if (title === "Daily Check In") {
      saveTaps(taps, userID);
      saveEnergy(curEnergy, userID)
      setTaps(0);
      router.push("dailyreward");
    }
    if (title === "Profit per Hour >") {
      saveTaps(taps, userID);
      saveEnergy(curEnergy, userID)
      setTaps(0);
      router.push("farm");
    }
  };
  return (
    <div
      className="relative bg-gradient-to-t from-[#DF1147] to-[#ee4e78] flex flex-col justify-between items-center py-3 rounded-xl h-[60px] w-full"
      onClick={handleNavigate}
    >
      {checkImg && (
        <Image
          className="absolute right-0 top-0 rounded-full"
          src={checkImg}
          alt=""
          width={16}
          height={16}
        />
      )}
      <div className="text-white text-xs text-nowrap">{title}</div>
      <div className="flex justify-center items-center h-4 gap-1">
        {iconImg && <Image src={iconImg} alt="" width={16} height={16} />}
        <div className="text-white text-sm">{content}</div>
      </div>
    </div>
  );
};

export default SecondaryButton;
