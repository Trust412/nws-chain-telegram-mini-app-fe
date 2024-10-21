"use client"
import Image from "next/image"

const Price = ({ point, coin }:{ point:number, coin:number }) => {
    return(
        <div className="flex text-white text-xs items-center gap-1 ">
            <Image className="w-4 h-4" src={"/image/goldcoin.png"} alt="" width={16} height={16}/>
            <div>{point}</div>
            <Image className="w-4 h-4" src={"/image/coin.png"} alt="" width={16} height={16}/>
            <div>{coin}</div>
        </div>
    )
}

export default Price;