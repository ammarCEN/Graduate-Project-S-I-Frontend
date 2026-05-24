'use client';

import useConnection from '@/app/providers/api-provider'
import StatusIndicator from './status-indicator'
import { Button } from './ui/button'
import { toast } from 'sonner';
import { SAQI } from '@/lib/saqi.index';
import CustomTooltip from './custom-tooltip';
import { useEffect } from 'react';

const SAQIConnectBtn = () => {
    const { isConnected, apiBase, setApiBase, setIsConnected, addLog } = useConnection();
    const autoConnect = SAQI.ENV.IsAutoConnect;
    const isRobotConnectionDefined = SAQI.ENV.RobotConnectIP != undefined;

    const handleAutoConnection = async () => {
        const base = SAQI.ENV.RobotConnectIP;

        if (!base) {
            toast.info("The robot IP address is not set !")
            return;
        }

        try {
            addLog({ "Trying to connect": base });
            const res = await fetch(`${base}/`);

            if (!res.ok) throw new Error("Bad response");

            setApiBase(base);
            setIsConnected(true);
            toast.success("Robot now is connected");
            addLog({ "Robot Connection Status": "Robot now is connected" });

        } catch {
            toast.error("Failed to connect");
            addLog({ "Robot Connection Status": "Failed to connect" });
        }
    }

    useEffect(() => {
        if (!autoConnect) return;
        if (isConnected) return;

        const run = async () => {
            await handleAutoConnection();
        };

        toast.info("Auto connect is enabled");
        run();
    }, []);

    return (
        <>
            <CustomTooltip
                asChild
                content={
                    <p>Connected via {apiBase}</p>
                }
            >
                <StatusIndicator
                    buttonGroup
                    connected={isConnected}
                    className="border px-2 rounded-lg"
                />
            </CustomTooltip>

            {!autoConnect && isRobotConnectionDefined && (
                <Button
                    onClick={handleAutoConnection}
                    variant="outline"
                >
                    {isConnected
                        ? <span>Reconnect</span>
                        : <span>Connect</span>
                    }

                </Button>
            )}
        </>
    )
}

export default SAQIConnectBtn