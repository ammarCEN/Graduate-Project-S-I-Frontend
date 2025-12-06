'use client';

interface StatusIndicatorProps {
    connected: boolean;
    className?: string;
}

const StatusIndicator = ({ connected, className = '' }: StatusIndicatorProps) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${connected ? 'bg-green-500' : 'bg-red-500'
                    }`}
            ></div>
            <span className="text-sm">{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
    );
};

export default StatusIndicator;
