"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";

const Homebutton = () => {
    const router = useRouter()
    return(
        <div className="fixed top-4 left-4 cursor-pointer z-30" onClick={() => router.push("/home")}>
            <Image src={"/image/backbutton.svg"} alt="" width={32} height={32}/>
        </div>
    )
}

export default Homebutton;