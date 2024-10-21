"use client";
import { useState } from "react";
import Primarybutton from "../button/primaryButton";
import LevelUpModal from "../modal/levelUpModal";
import axios from "axios";
import { userIDAtom } from "@/store/userInfo";
import { useAtom } from "jotai";
import Success from "../modal/success";
import Failed from "../modal/failed";

const DailyFree = ({ data }: { data: number }) => {
  const [userID] = useAtom(userIDAtom);

  const [leftCount, setLeftCount] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const handleLevelUp = () => {
    setIsOpen(false);
    axios
      .put(
        `https://b702-52-68-113-84.ngrok-free.app/api/update/daily-data/boostcount/${userID}`
      )
      .then((res) => {
        if (res.data) {
          handleSuccess();
          if (leftCount) setLeftCount((leftCount) => leftCount - 1);
        } else {
          handleFailed();
        }
      });
  };

  // Success and failed Alert
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true); // Show the Success component
    console.log(showSuccess);
    // Set a timer to hide the component after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  const handleFailed = () => {
    setShowFailed(true);
    console.log(showFailed);
    // Set a timer to hide the component after 3 seconds
    setTimeout(() => {
      setShowFailed(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-2 text-white">
      <div className="text-base font-semibold   px-4">Daily Free</div>
      <div className="px-4" onClick={() => setIsOpen(true)}>
        <Primarybutton
          mainImgSrc="/image/fullenergy.png"
          title={`Full Energy(${leftCount}/3)`}
          iconImgSrc=""
          content="Recover to 100% energy right now."
          lastImgSrc="/image/arrowright.png"
        />
      </div>
      {isOpen && (
        <LevelUpModal
          imgSrc={"/image/fullenergy.png"}
          title={`Full Energy(${leftCount}/3)`}
          description={"Recover to 100% energy right now."}
          cost={leftCount}
          level={-100}
          onLevelUp={handleLevelUp}
          onClose={() => setIsOpen(false)}
        />
      )}
      {showSuccess && <Success />}
      {showFailed && <Failed />}
    </div>
  );
};

export default DailyFree;
