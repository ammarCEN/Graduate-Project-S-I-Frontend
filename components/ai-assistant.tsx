'use client';

import { cn } from "@/lib/utils";
import useConnection from "@/app/providers/api-provider";
import { Card, CardContent } from "./ui/card";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import { useState } from "react";
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
                "cursor-pointer",

                "relative overflow-hidden border transition-all duration-300 shadow-lg hover:shadow-xl", // Enhanced shadow for futuristic feel

                // Light mode (futuristic clean)
                "bg-gradient-to-br from-gray-50 to-blue-100 border-blue-200", // Cooler tones for a tech vibe

                // Dark mode (futuristic deep)
                "dark:from-gray-800 dark:to-blue-900 dark:border-blue-800"
            )}
            onClick={handleToggleVision}
        >
            {/* Futuristic Glow Effect */}
            <div
                className={cn(
                    "absolute -inset-1 blur-3xl opacity-30", // Increased blur and opacity for a glowing effect
                    "bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500", // Cooler gradient for a tech feel
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
                        "data-[state=checked]:from-blue-500", // Start of gradient
                        "data-[state=checked]:to-purple-600" // End of gradient
                    )}
                />
            </CardContent>
        </Card>
    )
}

export default AIAssistant