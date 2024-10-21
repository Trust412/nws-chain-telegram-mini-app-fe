"use client"
import Primarybutton from "../button/primaryButton";
import CopyButton from "../button/copyButton";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InviteFrens = ({ inviteLink }: { inviteLink?: string }) => {
  return (
    <div className="text-white flex flex-col">
      <div className="text-base font-semibold  ">Invite Friends</div>
      <div className="flex">
        <Primarybutton
          mainImgSrc="/image/gift.png"
          title="Invite friend"
          iconImgSrc="/image/goldcoin.png"
          content="10,000"
          lastImgSrc="/image/arrowright.png"
        />
        <CopyButton inviteLink={inviteLink}/>
      </div>
    </div>
  );
};

export default InviteFrens;
