"use client"
import { useRouter } from "next/navigation";
import Primarybutton from "../button/primaryButton"

const Dailytask = ({dailyReward}:{dailyReward:number}) => {
    const router = useRouter()
    return(
        <div className="text-white" onClick={() => router.push("/dailyreward")}>
            <div className="text-base font-semibold  ">Daily Task</div>
            <Primarybutton
                mainImgSrc="/image/calendar.png"
                title="Daily Reward"
                iconImgSrc="/image/goldcoin.png"
                content={dailyReward.toLocaleString()}
                lastImgSrc="/image/arrowright.png"
            />
        </div>
    )
}

export default Dailytask;