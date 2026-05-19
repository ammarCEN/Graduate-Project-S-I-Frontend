import { ModeToggle } from "@/components/toggle-theme";
import { Card } from "./ui/card";
import Image from "next/image";

const Header = () => {
    return (
        <Card className="py-6 px-8">
            <span className="flex justify-between item-center items-center">
                <div className="flex items-center gap-4">
                    <img
                        className="h-20"
                        src={"/SAQI-Logo.png"}
                        alt="SAQI logo alt"
                    />
                    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance tracking-widest">SAQI Remote Control</h1>
                </div>
                <ModeToggle />
            </span>
        </Card>
    )
}

export default Header