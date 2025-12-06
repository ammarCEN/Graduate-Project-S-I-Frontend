import { ModeToggle } from "@/components/toggle-theme";
import { Card } from "./ui/card";

const Header = () => {
    return (
        <Card className="py-6 px-8">
            <span className="flex justify-between item-center items-center">
                <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Connect to Your Home robot</h1>
                <ModeToggle />
            </span>
        </Card>
    )
}

export default Header