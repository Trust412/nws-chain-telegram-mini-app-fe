"use client"
import Primarybutton from "../button/primaryButton";
import { extraBonusesData } from "@/data/extrabonuses";

const ExtraBonuses = () => {
  return (
    <div>
      <div className="text-white text-base font-semibold  ">Extra bonuses</div>
      <div className="flex gap-2 text-white overflow-scroll">
        {extraBonusesData.map((bonuses) => (
          <Primarybutton
            key={bonuses.id}
            mainImgSrc="/image/gift.png"
            title={ bonuses.inviteNum === 1 ? `Invite  1 Friend` : `Invite ${bonuses.inviteNum.toLocaleString()} Friends`}
            iconImgSrc="/image/goldcoin.png"
            content={bonuses.bonuses}
            lastImgSrc=""
          />
        ))}
      </div>
    </div>
  );
};
export default ExtraBonuses;
