"use client"
import Image from "next/image";
import Price from "./price";

interface buttonProp {
  mainImgSrc : string;
  title: string;
  iconImgSrc: string;
  content: string;
  lastImgSrc: string;
  point?: number;
  coin?: number;
}
const Primarybutton: React.FC<buttonProp> = ({ mainImgSrc, title, iconImgSrc, content, lastImgSrc, point = 0 ,coin = 0  }) => {
  return (
    <div className="bg-gradient-to-t from-[#e30f2e] to-[#db1360] text-white flex justify-between items-center py-1.5 px-3 mt-1 mr-1 h-[60px] rounded-xl w-full min-w-56 ">
      <div className="flex justify-center items-center">
        { mainImgSrc && <Image
          className="w-12 h-12 mr-1"
          src={mainImgSrc}
          alt="Image"
          width={48}
          height={48}
        />}
        <div className="flex flex-col justify-between px-1.5 py-3 rounded-xl mx-2 gap-1">
          <div className="flex items-center gap-2">
            <div className="text-xs leading-3 text-center font-bold">{title}</div>
            {point ? <Price point={point} coin={coin}/> : <div></div>}
          </div>
          <div className="flex items-center h-4">
            {iconImgSrc && <Image
              className="w-4 h-4 mr-1"
              src={iconImgSrc}
              alt=""
              width={16}
              height={16}
            />}
            <div className="text-[10px] leading-3">{content}</div>
          </div>
        </div>
      </div>
      { lastImgSrc && <Image
        className="flex justify-self-end"
        src={lastImgSrc}
        alt=""
        width={16}
        height={16}
      />}
    </div>
  );
};

export default Primarybutton;
