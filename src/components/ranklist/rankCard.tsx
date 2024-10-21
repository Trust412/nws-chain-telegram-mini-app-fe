"use client"
import { pointCal } from "@/utils/pointcal";
import Image from "next/image";

interface rankProp {
    ranking: number;
    firstName: string
    lastName:string
    imgSrc: string
    value: number
    color: string
}
const RankCard:React.FC<rankProp> = ({ ranking, firstName, lastName, imgSrc, value, color }) => {
    function findUppercase(firstName?: string, lastName?: string): string {
      if (!firstName && !lastName) return ''; // Return empty string if both are undefined

      let result = '';
      if (firstName) result += firstName[0]
      if (lastName) result += lastName[0]

      return result;
    }
    return(
        <div className={`flex justify-between items-center bg-gradient-to-t ${color} h-[60px] rounded-xl px-4`}>
            <div>{ranking > 100 ? '+99' : ranking}</div>
            <div className="bg-[#c94322] rounded-lg w-12 h-12 flex justify-center items-center">{findUppercase(firstName, lastName)}</div>
            <div className="overflow-hidden w-5/12">{firstName} {lastName}</div>
            <div className="flex items-center gap-1 w-1/4">
                <Image className="e-4 h-4" src={imgSrc} alt="" width={16} height={16}/>
                <div>{pointCal(value)}</div>
            </div>
        </div>
    )
}
// value > 10000 ? (value/1000).toFixed(1)+"k" : value
export default RankCard;
