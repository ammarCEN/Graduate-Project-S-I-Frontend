"use client";

import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "./ui/card";
import { IoSpeedometerOutline } from "react-icons/io5";
import HeaderComponent from "./header-component";
import useConnection from "@/app/providers/api-provider";



export default function SpeedSlider() {
    const { motorSpeedSlider, setMotorSpeedSlider } = useConnection();

    return (
        <div className="w-full">
            <HeaderComponent
                title={`Movement Speed: ${Math.round(motorSpeedSlider[0] * 100)}%`}
                // description='Adjust the movement speed. Minimum is 20% and maximum is 100%.'
                icon={IoSpeedometerOutline}
                iconSize="Small"
            />
            <Slider
                className="h-12"
                value={motorSpeedSlider}
                min={0}
                max={1}
                step={0.05}
                onValueChange={(val: number[]) => {
                    setMotorSpeedSlider(val);
                }}
            />
        </div>
    );
}
