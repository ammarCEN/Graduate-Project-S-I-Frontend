'use client';

import useConnection from "@/app/providers/api-provider";
import { Card, CardContent, CardFooter } from "./ui/card";
import HeaderComponent from "./header-component";
import { BsCameraVideo } from "react-icons/bs";
import MovementButton, { Direction } from "./single-navigation-button";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Robot } from "@/lib/api/robot-api-control";
import { RiDragMoveLine } from "react-icons/ri";



const CameraNavigationButtons = () => {
    const { apiBase, addLog } = useConnection();

    const handleZoom = async (zoom: "+" | "-") => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot execute — robot not connected");
            return
        }

        if (zoom == '+')
            await Robot.Camera.Zoom(apiBase, 500);
        else
            await Robot.Camera.Zoom(apiBase, 1);


    }
    const handleCenter = async () => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot execute — robot not connected");
            return
        }

        await Robot.Camera.Center(apiBase);


    }

    return (
        <Card>
            <CardContent>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <HeaderComponent
                        title='Camera Control'
                        description='These buttons are interactive camera controls that start moving the camera when pressed and stop automatically when released.'
                        icon={BsCameraVideo}
                    />
                    <div className="flex items-center ">
                        {/* Camera side control */}
                        <div className="flex flex-col gap-4">
                            <Button variant='outline' onClick={() => handleZoom("+")}>
                                +
                            </Button>
                            <Button variant='outline' onClick={() => handleZoom("-")}>
                                -
                            </Button>
                            <Button variant='outline' onClick={handleCenter}>
                                <RiDragMoveLine />
                            </Button>
                        </div>

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
                    </div>

                </div>
            </CardContent>
        </Card>

    )
}

export default CameraNavigationButtons