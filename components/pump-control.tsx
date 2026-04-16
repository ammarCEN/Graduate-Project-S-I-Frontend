'use client';

import useConnection from "@/app/providers/api-provider";
import { Card, CardContent } from "./ui/card";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import { useState } from "react";
import { PumpOff, PumpOn } from "@/lib/api/api";
import styles from '@/app/global.module.css';


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
                <div className={styles.headerTitle}>
                    <h1>Pump Control</h1>
                    <p>Enable or disable pump control.</p>
                </div>
                <Switch disabled={!isConnected} checked={isEnable} onCheckedChange={handleTogglePump}></Switch>
            </CardContent>
        </Card>
    )
}

export default PumpControl