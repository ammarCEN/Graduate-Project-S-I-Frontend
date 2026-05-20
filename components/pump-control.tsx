'use client';

import useConnection from "@/app/providers/api-provider";
import { Card, CardContent } from "./ui/card";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import { PumpOff, PumpOn } from "@/lib/api/api";
import HeaderComponent from "./header-component";
import { IoWaterOutline } from "react-icons/io5";


const PumpControl = () => {
    const { isPumpOn, setIsPumpOn, apiBase, isConnected, addLog } = useConnection();

    const handleTogglePump = async () => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot toggle pump — robot not connected");
            return;
        }

        let data;
        if (isPumpOn) {
            data = await PumpOff(apiBase);
            setIsPumpOn(false);
        }
        else {
            data = await PumpOn(apiBase);
            setIsPumpOn(true);
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
                    checked={isPumpOn}
                    onCheckedChange={handleTogglePump} />
            </CardContent>
        </Card>
    )
}

export default PumpControl