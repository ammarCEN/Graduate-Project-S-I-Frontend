import { ModeToggle } from "@/components/toggle-theme";
import { Card } from "./ui/card";
import ShowLiveLogs from "./show-live-logs";

const Header = () => {
    return (
        <Card className="py-6 px-8">
            <div className="flex justify-between item-center items-center flex-col gap-6 md:flex-row md:gap-2">
                <div className="flex items-center gap-4">
                    <img
                        className="h-20"
                        src={"/SAQI-Logo.png"}
                        alt="SAQI logo alt"
                    />
                    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance tracking-widest">SAQI Remote Control</h1>
                </div>
                <div className="flex items-center gap-2">
                    <ShowLiveLogs />
                    <ModeToggle />
                </div>
            </div>
        </Card>
    )
}

export default Header