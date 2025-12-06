"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { setSpeed, getSpeed } from "@/lib/speed";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Card } from "./ui/card";

export default function SpeedSlider() {
    const [value, setValue] = useState<number[]>([getSpeed()]);

    return (
        <Card className="p-4">
            <div className="space-y-2 [&_.ui-slider-thumb]:w-6 [&_.ui-slider-thumb]:h-6">
                <Label>Movement Speed: {Math.round(value[0] * 100)}%</Label>
                <Slider
                    className="h-12"
                    value={value}
                    min={0.2}
                    max={1}
                    step={0.05}
                    onValueChange={(val: number[]) => {
                        setValue(val);
                        setSpeed(val[0]);
                    }}
                />
            </div>
        </Card>
    );
}
