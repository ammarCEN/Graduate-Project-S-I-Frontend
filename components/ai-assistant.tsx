'use client';

import useConnection from "@/app/providers/api-provider";
import { Card, CardContent } from "./ui/card";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import { useState } from "react";
import { startAI, stopAI } from "@/lib/api/api";

const AIAssistant = () => {
    const [isEnable, setIsEnable] = useState(true);
    const { apiBase, isConnected, addLog } = useConnection();

    const handleToggleVision = async () => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot toggle vision — robot not connected");
            // setIsEnable(false);
            return;
        }

        let data;
        if (isEnable) {
            data = await stopAI(apiBase);
            setIsEnable(false);

        }
        else {
            data = await startAI(apiBase);
            setIsEnable(true);

        }

        addLog(data);
    }
    return (
        <Card>
            <CardContent className="flex justify-between items-center">
                <div>
                    <h1 className="font-bold">AI Assistant</h1>
                    <p className="text-sm text-gray-500">Enable or disable AI classification boxes.</p>
                </div>
                <Switch disabled={!isConnected} checked={isEnable} onCheckedChange={handleToggleVision}></Switch>
            </CardContent>
        </Card>
    )
}

export default AIAssistant