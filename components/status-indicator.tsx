'use client';

import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
    connected: boolean;
    className?: string;
    buttonGroup?: boolean;
}

const StatusIndicator = ({ connected, buttonGroup = false, className = '' }: StatusIndicatorProps) => {
    return (
        <div className={cn(
            'flex items-center gap-2',
            buttonGroup && 'bg-background dark:bg-input/30',
            className
        )}>
            <div
                className={cn(
                    "w-3 h-3 rounded-full transition-colors duration-300",
                    connected ? 'bg-green-500' : 'bg-red-500'
                )}
            />
            <span className="text-sm">{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
    );
};

export default StatusIndicator;
