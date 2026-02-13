'use client';

import { moveBackward, moveForward, stopRobot } from '@/lib/api/api';
import { Button } from './ui/button'
import { MoveUp, MoveDown, MoveLeft, MoveRight, Siren } from "lucide-react";
import { getSpeed } from '@/lib/speed';
import useConnection from '@/app/providers/api-provider';
import { Card, CardContent, CardFooter } from './ui/card';
import { toast } from 'sonner';
import MovementButton, { Direction } from './single-navigarion-button';
import styles from '@/app/global.module.css';


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
            <CardContent>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div className={styles.headerTitle}>
                        <h1>Movement Buttons</h1>
                        <p>These bottom buttons are interactive navigation buttons to start moving until unclicking and then automatically stopping the robot.</p>
                    </div>
                    <MovementButton action={Direction.Forward} icon={<MoveUp />} />
                    <span className='flex items-center justify-center gap-2'>
                        <MovementButton action={Direction.Left} icon={<MoveLeft />} />
                        <MovementButton action={Direction.Backward} icon={<MoveDown />} />
                        <MovementButton action={Direction.Right} icon={<MoveRight />} />
                    </span>

                </div>
            </CardContent>
            <CardFooter>
                {/* زر الطوارئ في الوسط */}
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white h-full" onClick={handleEmergencyStop}>
                    Emergency Stop <Siren />
                </Button>
            </CardFooter>
        </Card>

    )
}

export default NavigationButtons