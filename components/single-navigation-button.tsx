'use client';

import useConnection from '@/app/providers/api-provider';
import { Button } from './ui/button';
import { toast } from 'sonner';
import React, { useState } from 'react';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { SAQI } from '@/lib/saqi.index';

export enum Direction {
    Forward = 'forward',
    Backward = 'backward',
    Left = 'left',
    Right = 'right',
    Stop = 'stop',
}

interface RobotButtonProps {
    action: Direction;
    className?: string;
    isCameraMovement?: boolean;
}

const MovementButton: React.FC<RobotButtonProps> = ({ action, className, isCameraMovement = false }) => {
    const { apiBase, addLog, motorSpeedSlider, cameraZoomSlider } = useConnection();
    const [isActive, setIsActive] = useState(false);

    // Icon
    const Icon = getIcon(action, isCameraMovement);
    const rotation = ROTATION[action];

    // Functions
    const handleStart = async () => {
        if (!apiBase) {
            toast.error(SAQI.Logs.System.No_Connection);
            addLog(SAQI.Logs.Failed.Movement.Connecting);
            return;
        }

        setIsActive(true);

        try {
            let data;
            switch (action) {
                case Direction.Forward:
                    data = !isCameraMovement
                        ? await SAQI.Robot.Motor.Move.Forward(apiBase, motorSpeedSlider[0])
                        : await SAQI.Robot.Camera.Move.Up(apiBase);
                    break;
                case Direction.Backward:
                    data = !isCameraMovement
                        ? await SAQI.Robot.Motor.Move.Backward(apiBase, motorSpeedSlider[0])
                        : await SAQI.Robot.Camera.Move.Down(apiBase);
                    break;
                case Direction.Right:
                    data = !isCameraMovement
                        ? await SAQI.Robot.Motor.Move.Right(apiBase, motorSpeedSlider[0])
                        : await SAQI.Robot.Camera.Move.Right(apiBase);
                    break;
                case Direction.Left:
                    data = !isCameraMovement
                        ? await SAQI.Robot.Motor.Move.Left(apiBase, motorSpeedSlider[0])
                        : await SAQI.Robot.Camera.Move.Left(apiBase);
                    break;
                case Direction.Stop:
                    data = !isCameraMovement
                        ? await SAQI.Robot.Motor.Stop(apiBase)
                        : await SAQI.Robot.Camera.Stop(apiBase);
                default:
                    data = { "Direction": `${action} not implemented yet` }
                    setIsActive(false);
            }
            addLog(data);
        } catch (err: any) {
            addLog(SAQI.Logs.Failed.Movement.Error_Moving(action, err.message));
            setIsActive(false);
        }
    };

    const handleStop = async () => {
        if (!apiBase) return;
        setIsActive(false);
        try {
            let data;

            if (isCameraMovement)
                data = await SAQI.Robot.Camera.Stop(apiBase);
            else
                data = await SAQI.Robot.Motor.Stop(apiBase);

            addLog(data);
        } catch (err: any) {
            addLog(SAQI.Logs.Failed.Movement.Error_Stopping(err.message));
        }
    };

    return (
        <Label>
            <Button
                className={cn(
                    // allow passing extra classes from parent
                    className,

                    // mobile-friendly circular control look
                    'w-20 h-20 p-0 rounded-full flex items-center justify-center',
                    'text-2xl',
                    'bg-gradient-to-br from-slate-800 to-slate-700 text-white',
                    'shadow-2xl ring-2 ring-foreground/20',
                    'transition-transform duration-600 ease-out',

                    // tactile feedback
                    'active:scale-95 active:brightness-110',

                    // subtle hover for desktop
                    'hover:scale-105 hover:brightness-105',

                    // emergency stop look
                    action === Direction.Stop && "bg-red-600 hover:bg-red-700 text-white h-16",
                )}
                size={'lg'}
                onMouseDown={handleStart}
                onMouseUp={handleStop}
                onMouseLeave={() => { if (isActive) handleStop(); }}
                onTouchStart={handleStart}
                onTouchEnd={handleStop}
                aria-pressed={isActive}
                aria-label={`action-${action}`}
            >
                {<Icon size={16} className={cn(rotation, "scale-140")} />}
            </Button>
        </Label>
    );
};

const ROTATION: Record<Direction, string> = {
    [Direction.Forward]: "",
    [Direction.Backward]: "rotate-180",
    [Direction.Right]: "rotate-90",
    [Direction.Left]: "-rotate-90",
    [Direction.Stop]: "",
};

const getIcon = (action: Direction, isCameraMovement: boolean) => {
    if (action === Direction.Stop) {
        return isCameraMovement
            ? SAQI.Icons.Controls.Camera.Stop
            : SAQI.Icons.Controls.Motor.Stop
    }

    return isCameraMovement
        ? SAQI.Icons.Controls.Camera.Move
        : SAQI.Icons.Controls.Motor.Move
}

export default MovementButton;
