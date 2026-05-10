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
                "relative overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-md",

                // Light mode (eco clean)
                "bg-gradient-to-br from-white to-emerald-50 border-emerald-100",

                // Dark mode (eco deep)
                "dark:from-slate-900 dark:to-emerald-950 dark:border-emerald-900"
            )}
        >
            {/* Eco Glow Effect */}
            <div
                className={cn(
                    "absolute -inset-1 blur-2xl opacity-20",
                    "bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400",
                    "dark:opacity-25"
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
                // className={cn(
                //     "data-[state=checked]:bg-gradient-to-r",
                //     "data-[state=checked]:from-emerald-500",
                //     "data-[state=checked]:to-green-600"
                // )}
                />
            </CardContent>
        </Card>
    )
}

export default AIAssistant