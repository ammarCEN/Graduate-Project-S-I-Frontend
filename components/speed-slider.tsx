"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { setSpeed, getSpeed } from "@/lib/speed";
import { Card, CardContent } from "./ui/card";
import styles from '@/app/global.module.css';
import { IoSpeedometerOutline } from "react-icons/io5";
import HeaderComponent from "./header-component";



export default function SpeedSlider() {
    const [value, setValue] = useState<number[]>([getSpeed()]);

    return (
        <Card>
            <CardContent>
                <HeaderComponent
                    title={`Movement Speed: ${Math.round(value[0] * 100)}%`}
                    description='Adjust the movement speed. Minimum is 20% and maximum is 100%.'
                    icon={IoSpeedometerOutline}
                />
                <Slider
                    className="h-12"
                    value={value}
                    min={0}
                    max={1}
                    step={0.05}
                    onValueChange={(val: number[]) => {
                        setValue(val);
                        setSpeed(val[0]);
                    }}
                />
            </CardContent>
        </Card>
    );
}
