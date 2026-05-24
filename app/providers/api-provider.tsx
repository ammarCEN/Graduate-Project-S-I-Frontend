'use client';

import { SAQI } from "@/lib/saqi.index";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ConnectionContextType = {
    // System
    isConnected: boolean;
    setIsConnected: (val: boolean) => void;

    apiBase: string | null;
    setApiBase: (val: string | null) => void;

    // Controls
    isVisionOn: boolean;
    setIsVisionOn: (val: boolean) => void;

    isPumpOn: boolean;
    setIsPumpOn: (val: boolean) => void;

    // Sliders
    motorSpeedSlider: number[];
    setMotorSpeedSlider: (val: number[]) => void;
    cameraZoomSlider: number[];
    setCameraZoomSlider: (val: number[]) => void;

    // Logs
    logs: string[];
    addLog: (entry: any) => void;
    clearLogs: () => void;
};

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export function ConnectionProvider({ children }: { children: ReactNode }) {
    // ----------- States ----------- //
    // -- System
    const [apiBase, setApiBase] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    // -- Controls
    const [isVisionOn, setIsVisionOn] = useState<boolean>(false);
    const [isPumpOn, setIsPumpOn] = useState<boolean>(false);

    // -- Sliders
    const [motorSpeedSlider, setMotorSpeedSlider] = useState<number[]>([0.6]);
    const [cameraZoomSlider, setCameraZoomSlider] = useState<number[]>([1]);

    // Logs
    const addLog = (entry: any) => {
        const date = new Date();
        const timestamp = new Intl.DateTimeFormat('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(date).replace(',', '');

        const formatted =
            typeof entry === "string"
                ? entry
                : Object.entries(entry)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(" | ");

        setLogs(prev => [...prev, `▶ [${timestamp}] ${formatted}`]);
    };

    const clearLogs = () => setLogs([]);

    // Check connection each 3 seconds
    useEffect(() => {
        if (!apiBase) {
            setIsConnected(false);
            return;
        }

        const interval = setInterval(async () => {
            try {
                const res = await fetch(`${apiBase}/`);
                setIsConnected(res.ok);
            } catch {
                setApiBase(null)
                setIsConnected(false);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [apiBase]);

    return (
        <ConnectionContext.Provider value={{
            apiBase,
            setApiBase,

            isConnected,
            setIsConnected,

            isPumpOn,
            setIsPumpOn,

            isVisionOn,
            setIsVisionOn,

            motorSpeedSlider,
            setMotorSpeedSlider,

            cameraZoomSlider,
            setCameraZoomSlider,

            logs,
            addLog,
            clearLogs
        }}>
            {children}
        </ConnectionContext.Provider>
    );
}

export default function useConnection() {
    const ctx = useContext(ConnectionContext);
    if (!ctx) throw new Error("useConnection must be inside ConnectionProvider");
    return ctx;
}
