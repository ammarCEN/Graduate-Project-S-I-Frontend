'use client';

import { moveForward, moveBackward, stopRobot, moveRight, moveLeft } from '@/lib/api/api';
import useConnection from '@/app/providers/api-provider';
import { getSpeed } from '@/lib/speed';
import { Button } from './ui/button';
import { toast } from 'sonner';
import React, { useState } from 'react';

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
}

const MovementButton: React.FC<RobotButtonProps> = ({ action, icon, className }) => {
    const { apiBase, addLog } = useConnection();
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
                    data = await moveForward(apiBase, getSpeed());
                    break;
                case Direction.Backward:
                    data = await moveBackward(apiBase, getSpeed());
                    break;
                case Direction.Right:
                    data = await moveRight(apiBase, getSpeed());
                    break;
                case Direction.Left:
                    data = await moveLeft(apiBase, getSpeed());
                    break;
                default:
                    data = { "Direction": `${action} not implemented yet` }
                    setIsActive(false);
                // return;
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
            const data = await stopRobot(apiBase);
            addLog(data);
        } catch (err: any) {
            addLog(`Error stopping: ${err.message}`);
        }
    };

    return (
        <Button
            className={`${className} active:scale-115 active:brightness-90 active:bg-green-500 transition-transform duration-150`}
            onMouseDown={handleStart}
            onMouseUp={handleStop}
            onMouseLeave={isActive ? handleStop : () => { }}
            onTouchStart={handleStart}
            onTouchEnd={handleStop}
        >
            {icon}
        </Button>
    );
};

export default MovementButton;
