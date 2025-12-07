'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ConnectionContextType = {
    isConnected: boolean;
    setIsConnected: (val: boolean) => void;

    apiBase: string | null;
    setApiBase: (val: string | null) => void;

    logs: string[];
    addLog: (entry: any) => void;
    clearLogs: () => void;
};

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export function ConnectionProvider({ children }: { children: ReactNode }) {

    const [apiBase, setApiBase] = useState<string | null>(process.env.NEXT_PUBLIC_API_BASE || null);
    const [isConnected, setIsConnected] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);


    const addLog = (entry: any) => {
        const formatted =
            typeof entry === "string"
                ? entry
                : Object.entries(entry)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(" | ");

        setLogs(prev => [...prev, `▶ ${formatted}`]);
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
