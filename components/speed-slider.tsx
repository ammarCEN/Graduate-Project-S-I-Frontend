"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { setSpeed, getSpeed } from "@/lib/speed";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent } from "./ui/card";
import styles from '@/app/global.module.css';


export default function SpeedSlider() {
    const [value, setValue] = useState<number[]>([getSpeed()]);

    return (
        <Card>
            <CardContent>
                <div className={styles.headerTitle}>
                    <h1>Movement Speed: {Math.round(value[0] * 100)}%</h1>
                    <p>Adjust the movement speed. Minimum is 20% and maximum is 100%.</p>
                </div>
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
