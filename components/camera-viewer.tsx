'use client';

import useConnection from "@/app/providers/api-provider";
import NoCameraFeed from "./no-camera-feed";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import StatusIndicator from "./status-indicator";
import { Robot } from "@/lib/api/robot-api-control";


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

        addLog(`Trying to fetch camera feed → ${isVisionOn
            ? Robot.VideoFeed.Auto(apiBase)
            : Robot.VideoFeed.Manual(apiBase)
            }`);
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
                        // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgcJJ1UUym2YlvyeGhJ9AKvnkLeSiyGyEkCA&s"
                        src={
                            isVisionOn
                                ? Robot.VideoFeed.Auto(apiBase)
                                : Robot.VideoFeed.Manual(apiBase)
                        }
                        alt="Camera feed"
                        // onLoad={() => {
                        //     toast.info("CAM LOADED")
                        // }}
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
                    />
                }
            </div>
        </>
    )
}

export default CameraViewer