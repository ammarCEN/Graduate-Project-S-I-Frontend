'use client';

import { motorMoveForward, motorMoveBackward, motorStop, motorMoveRight, motorMoveLeft, cameraMoveUp, cameraMoveDown, cameraMoveRight, cameraMoveLeft } from '@/lib/api/api';
import useConnection from '@/app/providers/api-provider';
import { Button } from './ui/button';
import { toast } from 'sonner';
import React, { useState } from 'react';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

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
    const { apiBase, addLog, motorSpeedSlider } = useConnection();
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
                    data = isCameraMovement ?
                        await motorMoveForward(apiBase, motorSpeedSlider[0])
                        : await cameraMoveUp(apiBase)
                        ;
                    break;
                case Direction.Backward:
                    data = isCameraMovement ?
                        await motorMoveBackward(apiBase, motorSpeedSlider[0])
                        : await cameraMoveDown(apiBase)
                        ;
                    break;
                case Direction.Right:
                    data = isCameraMovement ?
                        await motorMoveRight(apiBase, motorSpeedSlider[0])
                        : await cameraMoveRight(apiBase)
                        ;
                    break;
                case Direction.Left:
                    data = isCameraMovement ?
                        await motorMoveLeft(apiBase, motorSpeedSlider[0])
                        : await cameraMoveLeft(apiBase)
                        ;
                    break;
                default:
                    data = { "Direction": `${action} not implemented yet` }
                    setIsActive(false);
                // return;
            }
            // switch (action) {
            //     case Direction.Forward:
            //         data = await moveForward(apiBase, getSpeed());
            //         break;
            //     case Direction.Backward:
            //         data = await moveBackward(apiBase, getSpeed());
            //         break;
            //     case Direction.Right:
            //         data = await moveRight(apiBase, getSpeed());
            //         break;
            //     case Direction.Left:
            //         data = await moveLeft(apiBase, getSpeed());
            //         break;
            //     default:
            //         data = { "Direction": `${action} not implemented yet` }
            //         setIsActive(false);
            //     // return;
            // }
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
            const data = await motorStop(apiBase);
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
