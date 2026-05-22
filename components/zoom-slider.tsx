"use client";

import { Slider } from "@/components/ui/slider";
import HeaderComponent from "./header-component";
import useConnection from "@/app/providers/api-provider";
import { toast } from "sonner";
import { SAQI } from "@/lib/saqi.index";



export default function ZoomSlider() {
    const { apiBase, addLog, cameraZoomSlider, setCameraZoomSlider } = useConnection();

    const handleZoom = async () => {
        if (!apiBase) {
            toast.error('No connection!');
            addLog(`Cannot adjust zoom — robot not connected`);
            return;
        }
        const data = await SAQI.Robot.Camera.Zoom(apiBase, cameraZoomSlider[0]);
        addLog(data);
    }
    return (
        <div className="flex flex-col items-center gap-4">

            <p>{getZoomLabel(cameraZoomSlider[0])}</p>
            <Slider
                orientation="vertical"
                className="h-12"
                value={cameraZoomSlider}
                min={1}
                max={9999}
                step={50}
                onValueChange={(val: number[]) => {
                    setCameraZoomSlider(val);
                }}
                onValueCommit={(val: number[]) => {
                    handleZoom();
                }}
            />
            <HeaderComponent
                title={"Zoom"}
                // title={`Zoom: ${getZoomLabel(cameraZoomSlider[0])}`}
                // description='Adjust the movement speed. Minimum is 20% and maximum is 100%.'
                // description={`${cameraZoomSlider[0]}`}
                description={""}
                icon={SAQI.Icons.Controls.Camera.Slider}
            />
        </div>
    );
}

const getZoomLabel = (value: number) => {
    if (value < 1000) return "Wide"
    if (value < 3000) return "Normal"
    if (value < 6000) return "Zoomed"
    if (value < 8500) return "Telephoto"
    return "Max Zoom"
}
