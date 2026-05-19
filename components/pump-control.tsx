'use client';

import useConnection from "@/app/providers/api-provider";
import { Card, CardContent } from "./ui/card";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import { useState } from "react";
import { PumpOff, PumpOn } from "@/lib/api/api";
import HeaderComponent from "./header-component";
import { IoWaterOutline } from "react-icons/io5";


const PumpControl = () => {
    const [isEnable, setIsEnable] = useState(false);
    const { apiBase, isConnected, addLog } = useConnection();

    const handleTogglePump = async () => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot toggle pump — robot not connected");
            // setIsEnable(false);
            return;
        }

        let data;
        if (isEnable) {
            data = await PumpOff(apiBase);
            setIsEnable(false);
        }
        else {
            data = await PumpOn(apiBase);
            setIsEnable(true);
        }

        addLog(data);
    }
    return (
        <Card>
            <CardContent className="flex justify-between items-center">
                <HeaderComponent
                    title='Pump Control'
                    description='Enable or disable pump control.'
                    icon={IoWaterOutline}
                />
                <Switch
                    disabled={!isConnected}
                    checked={isEnable}
                    onCheckedChange={handleTogglePump} />
            </CardContent>
        </Card>
    )
}

export default PumpControl