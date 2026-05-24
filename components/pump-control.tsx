'use client';

import useConnection from "@/app/providers/api-provider";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import HeaderComponent from "./header-component";
import { IoWaterOutline } from "react-icons/io5";
import { SAQI } from "@/lib/saqi.index";
import TouchableCard from "./touchable-card";

const PumpControl = () => {
    const { isPumpOn, setIsPumpOn, apiBase, addLog } = useConnection();

    const handleTogglePump = async () => {
        if (!apiBase) {
            toast.error(SAQI.Logs.System.No_Connection);
            addLog(SAQI.Logs.Failed.Pump);
            return;
        }

        let data;
        if (isPumpOn) {
            data = await SAQI.Robot.Pump.Deactivate(apiBase);
            setIsPumpOn(false);
        }
        else {
            data = await SAQI.Robot.Pump.Active(apiBase);
            setIsPumpOn(true);
        }

        addLog(data);
    }

    return (
        <TouchableCard
            theme="water"
            value={isPumpOn}
            handleValueToggle={handleTogglePump}
        >
            <HeaderComponent
                title='Manual watering'
                description='Active or de-active robot pump'
                icon={IoWaterOutline}
            />

            {/* <Switch
                disabled={!isConnected}
                checked={isPumpOn}
                onCheckedChange={handleTogglePump}
            /> */}
        </TouchableCard>
    )
}

export default PumpControl