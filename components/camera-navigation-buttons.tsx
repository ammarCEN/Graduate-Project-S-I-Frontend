'use client';

import useConnection from "@/app/providers/api-provider";
import { Card, CardContent, CardFooter } from "./ui/card";
import HeaderComponent from "./header-component";
import MovementButton, { Direction } from "./single-navigation-button";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Robot } from "@/lib/api/robot-api-control";
import ZoomSlider from "./zoom-slider";
import { Icons } from "@/lib/icons";
import { Separator } from "./ui/separator";



const CameraNavigationButtons = () => {
    const { apiBase, addLog, setCameraZoomSlider, cameraZoomSlider } = useConnection();

    const handleCenterCamera = async () => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot center camera — robot not connected");
            return
        }

        await Robot.Camera.Center(apiBase);
    }

    const handleWideCamera = async () => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot zoom out — robot not connected");
            return
        }
        setCameraZoomSlider([1]);
        const data = await Robot.Camera.Zoom(apiBase, cameraZoomSlider[0]);
        addLog(data);
    }

    const handleMaxZoomCamera = async () => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot zoom in — robot not connected");
            return
        }

        setCameraZoomSlider([9999]);
        const data = await Robot.Camera.Zoom(apiBase, cameraZoomSlider[0]);
        addLog(data);
    }

    return (
        <Card>
            <CardContent>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <HeaderComponent
                        title='Camera Control'
                        description='These buttons are interactive camera controls that start moving the camera when pressed and stop automatically when released.'
                        icon={Icons.Titles.CameraMovement}
                    />
                    <div className="flex items-center justify-between w-full gap-2">

                        {/* Camera side control */}
                        <ZoomSlider />

                        {/* Camera movement control */}
                        <div className='flex flex-col items-center justify-center gap-2'>
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

                        <div className="flex flex-col gap-4 justify-center">
                            <Button variant='outline' onClick={handleCenterCamera}>
                                <Icons.Controls.Camera.Center /> Center
                            </Button>
                            <Separator />
                            <Button variant='outline' onClick={handleWideCamera}>
                                <Icons.Controls.Camera.Zoom.Min_Zoom /> Wide
                            </Button>
                            <Button variant='outline' onClick={handleMaxZoomCamera}>
                                <Icons.Controls.Camera.Zoom.Max_Zoom /> Max Zoom
                            </Button>
                        </div>

                    </div>

                    {/* <Separator className="my-4" />
                    <div className="flex gap-4 justify-center">
                        <Button variant='outline' onClick={handleCenter}>
                            <Icons.Controls.Camera.Center /> Set Zoom
                        </Button>
                        <Button variant='outline' onClick={handleCenter}>
                            <Icons.Controls.Camera.Center /> Center
                        </Button>
                        <Button variant='outline' onClick={handleCenter}>
                            <Icons.Controls.Camera.Zoom.Max_Zoom /> Max Zoom
                        </Button>
                        <Button variant='outline' onClick={handleCenter}>
                            <Icons.Controls.Camera.Zoom.Min_Zoom /> Min Zoom
                        </Button>
                    </div> */}
                </div>
            </CardContent>
        </Card>

    )
}

export default CameraNavigationButtons