'use client';
import useConnection from "@/app/providers/api-provider";
import { videoFeedURL } from "@/lib/api/api";
import NoCameraFeed from "./no-camera-feed";
import { toast } from "sonner";


function CameraViewer() {
    const { apiBase, isConnected } = useConnection();

    // const handleCameraFeed = async () => {
    //     if (!apiBase)
    //         return;
    //     const data = await videoFeedURL(apiBase);
    //     console.log("Backend response:", data);

    //     return data;
    // }

    return (
        <div className="w-full">
            {!isConnected || !apiBase
                ?
                <NoCameraFeed />
                :
                <img
                    className="w-full p-4 rounded-xl"
                    // src={handleCameraFeed}
                    // src='http://192.168.8.183:8081/video'
                    src={videoFeedURL(apiBase)}
                    alt="Camera feed"
                    onError={() => {
                        // setKey(Date.now())

                    }}
                >
                </img>
            }
        </div>
    )
}

export default CameraViewer