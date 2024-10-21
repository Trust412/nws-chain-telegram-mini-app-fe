"use client"
import Image from "next/image";

const FrensTop = () => {
  return (
    <div className="text-white flex flex-col justify-center items-center">
      <Image src={"/image/friends.png"} alt="" width={108} height={90} />
      <div className="text-white text-2xl  ">Friends</div>
      <div className="text-sm">Invite friends to get rewards</div>
      {/* <div className="flex">
        <div className="text-sm">Support ID : 18427482837482674362383294</div>
        <Image className="w-5 h-5 ml-1" src={"/image/copy.png"} alt="" width={14} height={12} />
      </div> */}
    </div>
  );
};

export default FrensTop;