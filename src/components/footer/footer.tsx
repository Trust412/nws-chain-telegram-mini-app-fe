"use client"
import Nav from "./nav";
import { footerData } from "@/data/footer";

const Footer = () => {
    return(
        <div className="fixed bottom-5 w-screen flex justify-between items-center">
            {footerData.map((item) => (
                <Nav key={item.id} imgSrc={item.imgSrc} navName={item.navName}/>
            ))}
        </div>
    )
}


export default Footer;