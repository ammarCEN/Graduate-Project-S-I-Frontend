'use client';

import { moveBackward, moveForward, stopRobot } from '@/lib/api/api';
import { Button } from './ui/button'
import { MoveUp, MoveDown, MoveLeft, MoveRight, Siren } from "lucide-react";
import { getSpeed } from '@/lib/speed';
import useConnection from '@/app/providers/api-provider';
import { Card } from './ui/card';
import { toast } from 'sonner';


const NavigationButtons = () => {
    const buttonSize = "";
    const { apiBase, addLog } = useConnection();

    const handleMovingForward = async () => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot move — robot not connected");
            return
        }
        const data = await moveForward(apiBase, getSpeed());

        addLog(data);
    }

    const handleMovingBackward = async () => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot move — robot not connected");
            return
        }
        const data = await moveBackward(apiBase, getSpeed());

        addLog(data);
    }

    const handleEmergencyStop = async () => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot execute — robot not connected");
            return
        }
        const data = await stopRobot(apiBase);

        addLog(data);
    }

    return (
        <Card>
            <div className="flex flex-col items-center justify-center gap-4">

                {/* زر التحرك للأعلى */}
                <Button className={buttonSize} onClick={handleMovingForward}>
                    <MoveUp />
                </Button>

                {/* صف أزرار اليسار واليمين + زر الطوارئ في الوسط */}
                <div className="flex items-center gap-4">
                    <Button className={buttonSize}>
                        <MoveLeft />
                    </Button>

                    {/* زر الطوارئ في الوسط */}
                    <Button className="bg-red-600 hover:bg-red-700 text-white h-full" onClick={handleEmergencyStop}>
                        Emergency Stop <Siren />
                    </Button>

                    <Button className={buttonSize}>
                        <MoveRight />
                    </Button>
                </div>

                {/* زر التحرك للأسفل */}
                <Button className={buttonSize} onClick={handleMovingBackward}>
                    <MoveDown />
                </Button>

            </div>
        </Card>

    )
}

export default NavigationButtons