'use client';
import useConnection from "@/app/providers/api-provider";
import { videoFeedURL } from "@/lib/api/api";
import NoCameraFeed from "./no-camera-feed";
import { toast } from "sonner";


function CameraViewer() {
    const { apiBase, connected } = useConnection();

    // // Immediately refresh
    // const [key, setKey] = useState(Date.now());

    // toast.info(`API FETCH: ${videoFeedURL(apiBase!)}`);
    // toast.info("DIRECT URL: http://192.168.8.183:8081/video");
    return (
        <div className="w-full">
            {!connected || !apiBase
                ?
                <NoCameraFeed />
                :
                <img
                    // key={key}
                    className="w-full p-4 rounded-xl"
                    // src={videoFeedURL(apiBase!)}
                    src="http://192.168.8.183:8081/video"
                    alt="Camera feed"
                // onError={() => {
                //     setKey(Date.now())
                //     toast.success("Camera refreshed successfully.")
                // }}
                >
                </img>
            }
        </div>
    )
}

export default CameraViewer