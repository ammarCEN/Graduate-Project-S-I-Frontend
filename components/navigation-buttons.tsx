'use client';

import { moveBackward, moveForward, stopRobot } from '@/lib/api/api';
import { Button } from './ui/button'
import { MoveUp, MoveDown, MoveLeft, MoveRight, Siren } from "lucide-react";
import { getSpeed } from '@/lib/speed';
import useConnection from '@/app/providers/api-provider';
import { Card, CardContent, CardFooter } from './ui/card';
import { toast } from 'sonner';
import MovementButton, { Direction } from './single-navigarion-button';


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
                {/* <h1 className="font-bold">Navigation Control</h1>
                <p className="text-sm text-gray-500">Buttons for controlling robot movement.</p> */}
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
            </CardContent>
            <CardFooter>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <div>
                        <p className="text-sm text-gray-500"><b>DEVELOPER NOTES:</b> These bottom buttons are interactive navigation buttons improved from those at the top to start moving until unclicking and then automatically stopping the robot.</p>
                        <p className="text-sm text-gray-500 italic">Please contact me to confirm replacement.</p>
                    </div>
                    <MovementButton action={Direction.Forward} icon={<MoveUp />} />
                    <span className='flex items-center justify-center gap-2'>
                        <MovementButton action={Direction.Left} icon={<MoveLeft />} />
                        <MovementButton action={Direction.Backward} icon={<MoveDown />} />
                        <MovementButton action={Direction.Right} icon={<MoveRight />} />
                    </span>

                </div>
            </CardFooter>
        </Card>

    )
}

export default NavigationButtons