'use client';

import useConnection from '@/app/providers/api-provider';
import { Button } from './ui/button';
import { toast } from 'sonner';
import React, { useState } from 'react';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { Robot } from '@/lib/api/robot-api-control';

export enum Direction {
    Forward = 'forward',
    Backward = 'backward',
    Left = 'left',
    Right = 'right',
}

interface RobotButtonProps {
    action: Direction;
    icon: React.ReactNode;
    className?: string;
    isCameraMovement?: boolean;
}

const MovementButton: React.FC<RobotButtonProps> = ({ action, icon, className, isCameraMovement = false }) => {
    const { apiBase, addLog, motorSpeedSlider, cameraZoomSlider } = useConnection();
    const [isActive, setIsActive] = useState(false);

    const handleStart = async () => {
        if (!apiBase) {
            toast.error('No connection!');
            addLog(`Cannot move — robot not connected`);
            return;
        }

        setIsActive(true);

        try {
            let data;
            switch (action) {
                case Direction.Forward:
                    data = isCameraMovement
                        ? await Robot.Motor.Move.Forward(apiBase, motorSpeedSlider[0])
                        : await Robot.Camera.Move.Up(apiBase, cameraZoomSlider[0]);
                    break;
                case Direction.Backward:
                    data = isCameraMovement
                        ? await Robot.Motor.Move.Backward(apiBase, motorSpeedSlider[0])
                        : await Robot.Camera.Move.Down(apiBase, cameraZoomSlider[0]);
                    break;
                case Direction.Right:
                    data = isCameraMovement
                        ? await Robot.Motor.Move.Right(apiBase, motorSpeedSlider[0])
                        : await Robot.Camera.Move.Right(apiBase, cameraZoomSlider[0]);
                    break;
                case Direction.Left:
                    data = isCameraMovement
                        ? await Robot.Motor.Move.Left(apiBase, motorSpeedSlider[0])
                        : await Robot.Camera.Move.Left(apiBase, cameraZoomSlider[0]);
                    break;
                default:
                    data = { "Direction": `${action} not implemented yet` }
                    setIsActive(false);
            }
            addLog(data);
        } catch (err: any) {
            addLog(`Error moving ${action}: ${err.message}`);
            setIsActive(false);
        }
    };

    const handleStop = async () => {
        if (!apiBase) return;
        setIsActive(false);
        try {
            let data;

            if (isCameraMovement)
                data = await Robot.Camera.Stop(apiBase);
            else
                data = await Robot.Motor.Stop(apiBase);

            addLog(data);
        } catch (err: any) {
            addLog(`Error stopping: ${err.message}`);
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
                    'shadow-2xl ring-1 ring-black/20',
                    'transition-transform duration-150 ease-out',
                    // tactile feedback
                    'active:scale-95 active:brightness-110',
                    // subtle hover for desktop
                    'hover:scale-105 hover:brightness-105',
                )}
                size={'lg'}
                onMouseDown={handleStart}
                onMouseUp={handleStop}
                onMouseLeave={() => { if (isActive) handleStop(); }}
                onTouchStart={handleStart}
                onTouchEnd={handleStop}
                aria-pressed={isActive}
                aria-label={`move-${action}`}
            >
                {icon}
            </Button>
        </Label>
    );
};

export default MovementButton;
