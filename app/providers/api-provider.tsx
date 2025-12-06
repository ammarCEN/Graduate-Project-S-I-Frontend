'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ConnectionContextType = {
    connected: boolean;
    setConnected: (val: boolean) => void;
    apiBase: string | null;
    setApiBase: (val: string | null) => void;
};

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export function ConnectionProvider({ children }: { children: ReactNode }) {
    const [connected, setConnected] = useState(false);
    const [apiBase, setApiBase] = useState<string | null>(null);

    // مثال: تحقق من صحة الرابط تلقائياً كل 3 ثواني
    useEffect(() => {
        if (!apiBase) {
            setConnected(false);
            return;
        }

        const interval = setInterval(async () => {
            try {
                const res = await fetch(`${apiBase}/`);
                setConnected(res.ok);
            } catch {
                setConnected(false);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [apiBase]);

    return (
        <ConnectionContext.Provider value={{ connected, setConnected, apiBase, setApiBase }}>
            {children}
        </ConnectionContext.Provider>
    );
}

export default function useConnection() {
    const ctx = useContext(ConnectionContext);
    if (!ctx) throw new Error("useConnection must be inside ConnectionProvider");
    return ctx;
}
