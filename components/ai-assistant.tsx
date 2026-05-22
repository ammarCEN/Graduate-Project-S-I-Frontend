'use client';

import { cn } from "@/lib/utils";
import useConnection from "@/app/providers/api-provider";
import { Card, CardContent } from "./ui/card";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import HeaderComponent from "./header-component";
import { GiBrain } from "react-icons/gi";



const AIAssistant = () => {
    const { apiBase, isConnected, addLog } = useConnection();
    const { isVisionOn, setIsVisionOn } = useConnection();

    const handleToggleVision = async () => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot toggle vision — robot not connected");
            return;
        }

        let data;
        if (isVisionOn) {
            setIsVisionOn(false);
            data = "ADMIN: Camera Vision Off";
        }
        else {
            setIsVisionOn(true);
            data = "ADMIN: Camera Vision On";
        }
        addLog(data);
    }
    return (
        // <Card className="bg-slate-900 text-white border-slate-700">
        //     <CardContent className="flex justify-between items-center">
        //         <HeaderComponent
        //             title='AI Assistant'
        //             description='Enable or disable AI classification boxes.'
        //             icon={GiBrain}
        //         />
        //         <Switch disabled={!isConnected} checked={isVisionOn} onCheckedChange={handleToggleVision}></Switch>
        //     </CardContent>
        // </Card>


        <Card
            className={cn(
                "w-full",

                "cursor-pointer border-primary/30",

                "relative overflow-hidden border transition-all duration-800 shadow-lg hover:shadow-xl", // Enhanced shadow for futuristic feel

                // Light mode
                "bg-gradient-to-br from-primary/30 to-primary/30 ",

                // Dark mode
                "dark:bg-gradient-to-br dark:from-primary/30 dark:to-primary/20",
            )}
            onClick={handleToggleVision}
        >
            {/* Futuristic Glow Effect */}
            <div
                className={cn(
                    "absolute -inset-1 blur-3xl opacity-30", // Increased blur and opacity for a glowing effect
                    "bg-gradient-to-r from-primary via-primary/70 to-background/50", // Cooler gradient for a tech feel
                    "dark:opacity-40"
                )}
            />

            <CardContent className="relative flex justify-between items-center">
                <HeaderComponent
                    title='AI Assistant'
                    description='Enable or disable AI classification boxes.'
                    icon={GiBrain}
                />

                <Switch
                    disabled={!isConnected}
                    checked={isVisionOn}
                    onCheckedChange={handleToggleVision}
                    className={cn(
                        "data-[state=checked]:bg-gradient-to-r", // Gradient for checked state
                        "data-[state=checked]:from-primary/60", // Start of gradient
                        "data-[state=checked]:via-background/30", // Start of gradient
                        "data-[state=checked]:to-primary", // End of gradient
                    )}
                />
            </CardContent>
        </Card>
    )
}

export default AIAssistant