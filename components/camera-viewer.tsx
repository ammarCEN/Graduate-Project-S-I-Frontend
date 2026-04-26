'use client';
import useConnection from "@/app/providers/api-provider";
import { ManualCameraFeed, AiCameraFeed } from "@/lib/api/api";
// import { AICameraFeed } from "@/lib/api/api";
import NoCameraFeed from "./no-camera-feed";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import StatusIndicator from "./status-indicator";


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

        setIsCameraFeed(true);
        addLog(`Trying to fetch camera feed → ${isVisionOn ? AiCameraFeed(apiBase) : ManualCameraFeed(apiBase)}`);
    }, [apiBase, isConnected, refreshTrigger]);


    return (
        <>
            <StatusIndicator connected={isCameraFeed} />
            <div className="w-full">
                {cameraConnectionStatus
                    ?
                    <NoCameraFeed onRefresh={() => setRefreshTrigger(!refreshTrigger)} />
                    :
                    <img
                        className="w-full p-4 rounded-xl"
                        // src={handleCameraFeed}
                        // src='http://192.168.8.183:8081/video'
                        // src={PureCameraFeed(apiBase)}
                        src={isVisionOn ? AiCameraFeed(apiBase) : ManualCameraFeed(apiBase)}
                        alt="Camera feed"
                        onError={() => {
                            setIsCameraFeed(false);
                            toast.error("No camera feed!");
                            if (!isConnected) {
                                addLog("Camera feed failed — robot not connected");
                            }
                            else {
                                addLog("Camera feed failed to fetch");
                            }
                        }}
                    >
                    </img>
                }
            </div>
        </>
    )
}

export default CameraViewer