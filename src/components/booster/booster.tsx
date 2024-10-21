"use client";
import { boosterData } from "@/data/booster";
import Primarybutton from "../button/primaryButton";
import { useState } from "react";
import LevelUpModal from "../modal/levelUpModal";
import { BoostData } from "@/app/boost/page";
import axios from "axios";
import { userIDAtom } from "@/store/userInfo";
import { useAtom } from "jotai";
import Success from "../modal/success";
import NotEnoughPoint from "../modal/notenoughpoint";

interface BoosterData {
  render: boolean;
  setRender: React.Dispatch<React.SetStateAction<boolean>>;
  data?: BoostData | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Boosteritem: React.FC<BoosterData> = ({ data, render, setRender }) => {
  const [userID] = useAtom(userIDAtom);

  // useEffect(() => {
  //   boosterData[0].level = data?.recoverSpeedLevel ?? 0;
  //   boosterData[0].cost = data?.rsNextLevelInfo?.cost ?? 0;
  //   boosterData[1].level = data?.maxEnergyLevel ?? 0;
  //   boosterData[1].cost = data?.meNextLevelInfo?.cost ?? 0;
  //   boosterData[2].level = data?.multiValueLevel ?? 0;
  //   boosterData[2].cost = data?.mvNextLevelInfo?.cost ?? 0;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState(boosterData[0]);

  const handleLevelUp = (id: number) => {
    setIsOpen(false);
    const updateData = [0, 0, 0];
    if (id === 1) updateData[1] = 1;
    if (id === 2) updateData[0] = 1;
    if (id === 3) updateData[2] = 1;
    axios
      .put(
        `https://b702-52-68-113-84.ngrok-free.app/api/update/energy-levelup/${userID}`,
        {
          newMaxLvl: updateData[0],
          newSecondIncLvl: updateData[1],
          newTap2PointLvl: updateData[2],
        }
      )
      .then((res) => {
        if (res.data) {
          handleSuccess();
          boosterData[id - 1].level = boosterData[id - 1].level + 1;
          setRender(!render);
        } else {
          handleNotEnoughPoint();
        }
      })
      .catch((err) => console.log(err));
  };

  const levelUp = (id: number) => {
    setIsOpen(true);
    setInfo(boosterData[id]);
  };

  // Success and failed Alert
  const [showSuccess, setShowSuccess] = useState(false);
  const [showNotEnoughPoint, setShowNotEnoughPoint] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true); // Show the Success component
    console.log(showSuccess);
    // Set a timer to hide the component after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  const handleNotEnoughPoint = () => {
    setShowNotEnoughPoint(true);
    console.log(showNotEnoughPoint);
    // Set a timer to hide the component after 3 seconds
    setTimeout(() => {
      setShowNotEnoughPoint(false);
    }, 3000);
  };

  return (
    <>
      <div className="flex flex-col gap-2 text-white p-4">
        <div className="text-base font-semibold  ">Booster</div>
        {boosterData.map((item) => (
          <div key={item.id} onClick={() => levelUp(item.id - 1)}>
            <Primarybutton
              mainImgSrc={item.mainImgSrc}
              title={`${item.title} (Lv${item.level})`}
              iconImgSrc="/image/goldcoin.png"
              content={item.cost.toLocaleString()}
              lastImgSrc="/image/arrowright.png"
            />
          </div>
        ))}
      </div>
      {isOpen && (
        <LevelUpModal
          imgSrc={info.mainImgSrc}
          title={info.title}
          description={info.description}
          cost={info.cost}
          level={info.level + 1}
          onLevelUp={() => handleLevelUp(info.id)}
          onClose={() => setIsOpen(false)}
        />
      )}
      {showSuccess && <Success />}
      {showNotEnoughPoint && <NotEnoughPoint />}
    </>
  );
};

export default Boosteritem;
