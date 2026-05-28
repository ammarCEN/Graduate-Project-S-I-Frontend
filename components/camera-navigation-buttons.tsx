'use client';

import useConnection from "@/app/providers/api-provider";
import { Card, CardContent } from "./ui/card";
import HeaderComponent from "./header-component";
import MovementButton, { Direction } from "./single-navigation-button";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { SAQI } from "@/lib/saqi.index";
import ZoomSlider from "./zoom-slider";
import { Separator } from "./ui/separator";



const CameraNavigationButtons = () => {
    const { apiBase, addLog, setCameraZoomSlider, cameraZoomSlider } = useConnection();

    const handleCenterCamera = async () => {
        if (!apiBase) {
            toast.error(SAQI.Logs.System.No_Connection);
            addLog(SAQI.Logs.Failed.Camera.Center);
            return
        }

        const data = await SAQI.Robot.Camera.Center(apiBase);
        addLog(data);
    }

    const handleWideCamera = async () => {
        if (!apiBase) {
            toast.error(SAQI.Logs.System.No_Connection);
            addLog(SAQI.Logs.Failed.Camera.Zoom_Out);
            return
        }
        setCameraZoomSlider([1]);
        const data = await SAQI.Robot.Camera.Zoom(apiBase, cameraZoomSlider[0]);
        addLog(data);
    }

    const handleMaxZoomCamera = async () => {
        if (!apiBase) {
            toast.error(SAQI.Logs.System.No_Connection);
            addLog(SAQI.Logs.Failed.Camera.Zoom_In);
            return
        }

        setCameraZoomSlider([9999]);
        const data = await SAQI.Robot.Camera.Zoom(apiBase, cameraZoomSlider[0]);
        addLog(data);
    }

    return (
        <Card>
            <CardContent>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <HeaderComponent
                        title='Camera Control'
                        // description='These buttons are interactive camera controls that start moving the camera when pressed and stop automatically when released.'
                        icon={SAQI.Icons.Titles.CameraMovement}
                        iconSize="Small"
                    />
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="w-full flex items-center justify-evenly gap-0 md:gap-6">
                            {/* Slider control */}
                            <ZoomSlider />

                            {/* Movement control */}
                            <div className='scale-75 md:scale-100 flex flex-col items-center justify-center gap-2'>
                                {/* Forward */}
                                <MovementButton isCameraMovement action={Direction.Forward} />

                                {/* Middle row: Left, Emergency Stop, Right */}
                                <div className='flex items-center justify-center gap-2'>
                                    <MovementButton isCameraMovement action={Direction.Left} />
                                    <MovementButton isCameraMovement action={Direction.Stop} />
                                    <MovementButton isCameraMovement action={Direction.Right} />
                                </div>

                                {/* Backward */}
                                <MovementButton isCameraMovement action={Direction.Backward} />
                            </div>
                        </div>

                        {/* Shortcuts buttons */}
                        <div className="flex flex-row md:flex-col gap-4 justify-center">
                            <Button variant='outline' onClick={handleMaxZoomCamera}>
                                <SAQI.Icons.Controls.Camera.Zoom.Max_Zoom /> Max Zoom
                            </Button>
                            <Button variant='outline' onClick={handleWideCamera}>
                                <SAQI.Icons.Controls.Camera.Zoom.Min_Zoom /> Wide
                            </Button>
                            <Separator className="hidden md:block" />
                            <Button variant='outline' onClick={handleCenterCamera}>
                                <SAQI.Icons.Controls.Camera.Center /> Center
                            </Button>
                        </div>

                    </div>
                </div>
            </CardContent>
        </Card>

    )
}

export default CameraNavigationButtons