'use client';

import useConnection from "@/app/providers/api-provider";
import NoCameraFeed from "./no-camera-feed";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import StatusIndicator from "./status-indicator";
import { SAQI } from "@/lib/saqi.index";


function CameraViewer() {
    const { apiBase, isConnected, addLog } = useConnection();
    const { isVisionOn } = useConnection();

    const [isCameraFeed, setIsCameraFeed] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const cameraConnectionStatus = !isConnected || !apiBase || !isCameraFeed;

    useEffect(() => {
        if (!apiBase || !isConnected) {
            setIsCameraFeed(false);
            return;
        }

        addLog(SAQI.Logs.Waiting.Camera_Fetch(isVisionOn
            ? SAQI.Robot.VideoFeed.Auto(apiBase)
            : SAQI.Robot.VideoFeed.Manual(apiBase)));
        setIsCameraFeed(true);
    }, [apiBase, isConnected, refreshTrigger]);

    return (
        <>
            <StatusIndicator connected={isCameraFeed} />
            <div className="w-full border rounded-md">
                {cameraConnectionStatus
                    ?
                    <NoCameraFeed onRefresh={() => setRefreshTrigger(prev => !prev)} />
                    :
                    <img
                        className="max-h-[80vh] p-4 rounded-xl"
                        src={
                            isVisionOn
                                ? SAQI.Robot.VideoFeed.Auto(apiBase)
                                : SAQI.Robot.VideoFeed.Manual(apiBase)
                        }
                        alt="Camera feed"
                        onError={() => {
                            setIsCameraFeed(false);
                            toast.error("No camera feed!");
                            if (!isConnected) {
                                addLog(SAQI.Logs.Failed.Camera.NotConnected_Fetch);
                            }
                            else {
                                addLog(SAQI.Logs.Failed.Camera.Connected_Fetch);
                            }
                        }}
                    />
                }
            </div>
        </>
    )
}

export default CameraViewer