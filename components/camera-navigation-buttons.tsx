'use client';

import useConnection from "@/app/providers/api-provider";
import { Card, CardContent, CardFooter } from "./ui/card";
import HeaderComponent from "./header-component";
import { BsCameraVideo } from "react-icons/bs";
import { FaAngleDoubleUp } from "react-icons/fa";
import MovementButton, { Direction } from "./single-navigation-button";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { cameraSetCenter, cameraZoom } from "@/lib/api/api";


const CameraNavigationButtons = () => {
    const { apiBase, addLog } = useConnection();

    const handleZoom = async (zoom: "+" | "-") => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot execute — robot not connected");
            return
        }

        if (zoom == '+')
            await cameraZoom(apiBase, 500);
        else
            await cameraZoom(apiBase, 1);


    }
    const handleCenter = async () => {
        if (!apiBase) {
            toast.error("No connection!");
            addLog("Cannot execute — robot not connected");
            return
        }

        await cameraSetCenter(apiBase);


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
                    <div className='flex flex-col items-center justify-center gap-2'>
                        {/* Up */}
                        <MovementButton isCameraMovement action={Direction.Forward} icon={<FaAngleDoubleUp />} />

                        {/* Middle row: Left, (empty center), Right */}
                        <div className='flex items-center justify-center gap-2'>
                            <MovementButton isCameraMovement action={Direction.Left} icon={<FaAngleDoubleUp className='rotate-270' />} />
                            <div className='w-12' />
                            <MovementButton isCameraMovement action={Direction.Right} icon={<FaAngleDoubleUp className='rotate-90' />} />
                        </div>

                        {/* Down */}
                        <MovementButton isCameraMovement action={Direction.Backward} icon={<FaAngleDoubleUp className='rotate-180' />} />
                    </div>

                </div>
            </CardContent>
            <CardFooter className="flex gap-4">
                {/* زر الطوارئ في الوسط */}
                <Button variant='outline' onClick={() => handleZoom("+")}>
                    +
                </Button>
                <Button variant='outline' onClick={() => handleZoom("-")}>
                    -
                </Button>
                <Button variant='outline' onClick={handleCenter}>
                    center
                </Button>
            </CardFooter>
        </Card>

    )
}

export default CameraNavigationButtons