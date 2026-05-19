'use client';

import { stopRobot } from '@/lib/api/api';
import { Button } from './ui/button'
import { MoveUp, MoveDown, MoveLeft, MoveRight, Siren } from "lucide-react";
import { FaAngleDoubleUp } from "react-icons/fa";
import useConnection from '@/app/providers/api-provider';
import { Card, CardContent, CardFooter } from './ui/card';
import { toast } from 'sonner';
import MovementButton, { Direction } from './single-navigation-button';
import { PiTireDuotone } from "react-icons/pi";
import HeaderComponent from './header-component';
import { Label } from './ui/label';



const NavigationButtons = () => {
    const { apiBase, addLog } = useConnection();

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
                    <HeaderComponent
                        title='Movement Buttons'
                        description='These bottom buttons are interactive navigation buttons to start moving until unclick and then automatically stopping the robot.'
                        icon={PiTireDuotone}
                    />
                    <div className='flex flex-col items-center justify-center gap-2'>
                        {/* Up */}
                        <MovementButton action={Direction.Forward} icon={<FaAngleDoubleUp />} />

                        {/* Middle row: Left, (empty center), Right */}
                        <div className='flex items-center justify-center gap-2'>
                            <MovementButton action={Direction.Left} icon={<FaAngleDoubleUp className='rotate-270' />} />
                            <div className='w-12' />
                            <MovementButton action={Direction.Right} icon={<FaAngleDoubleUp className='rotate-90' />} />
                        </div>

                        {/* Down */}
                        <MovementButton action={Direction.Backward} icon={<FaAngleDoubleUp className='rotate-180' />} />
                    </div>

                </div>
            </CardContent>
            <CardFooter>
                {/* زر الطوارئ في الوسط */}
                <Button className="w-full h-16 bg-red-600 hover:bg-red-700 text-white" onClick={handleEmergencyStop}>
                    <Siren /> Emergency Stop
                </Button>
            </CardFooter>
        </Card>

    )
}

export default NavigationButtons