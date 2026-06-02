'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button';
import HeaderComponent from './header-component';
import { SAQI } from '@/lib/saqi.index';
import useConnection from '@/app/providers/api-provider';
import { toast } from 'sonner';
import { useState } from 'react';

const getDistanceFetcher = (base: string) => () =>
    SAQI.Robot.Ultrasonic.getDistance(base);

const UltrasonicComponent = () => {
    const { apiBase, addLog } = useConnection();

    // if (!apiBase) {
    //     toast.error(SAQI.Logs.System.No_Connection);
    //     addLog(SAQI.Logs.Failed.Camera.Center);
    //     return
    // }

    // const { data, error, isLoading } = useSWR(
    //     apiBase ? `${apiBase}/ultrasonic/scan` : null,
    //     (url: string) => fetch(url, { cache: "no-store" }).then(res => res.json()),
    //     {
    //         refreshInterval: 500,
    //     }
    // );

    // const distance = data?.front ?? "---";
    // const leftDistance = data?.left ?? "---";
    // const rightDistance = data?.right ?? "---";

    const [frontDistance, setFrontDistance] = useState("---");
    const [leftDistance, setLeftDistance] = useState("---");
    const [rightDistance, setRightDistance] = useState("---");

    const handleGetDistance = async () => {
        if (!apiBase) {
            toast.error(SAQI.Logs.System.No_Connection);
            addLog(SAQI.Logs.Failed.Ultrasonic);
            return
        }
        const data = await SAQI.Robot.Ultrasonic.getDistance(apiBase);
        if ("error" in data) {
            addLog(data.error);
            return;
        }

        setFrontDistance(data.front ? `${data.front}cm` : "---");
        setLeftDistance(data.left ? `${data.left}cm` : "---");
        setRightDistance(data.right ? `${data.right}cm` : "---");
        addLog(data);
    }

    const handleClearReadings = () => {
        setFrontDistance("---");
        setLeftDistance("---");
        setRightDistance("---");
    }

    return (
        <Card>
            <CardContent className={cn(
                "w-full min-h-85",
                "flex flex-col items-center justify-between gap-12",
            )}>
                <HeaderComponent
                    title='Distance controller'
                    icon={SAQI.Icons.Titles.Ultrasonic}
                />
                <h1 className='text-7xl font-bold'>
                    {frontDistance}
                </h1>
                <div className={cn(
                    'flex gap-12',
                    'border rounded-xl px-4 py-2',
                    'text-lg font-900',
                    // "transition-all duration-500"
                )}>
                    <Readings
                        direction='Left'
                        distance={leftDistance}
                    />
                    <div className='flex gap-2'>
                        <Button className='!bg-primary/20 text-foreground' onClick={handleGetDistance}>
                            <SAQI.Icons.Controls.Ultrasonic.Scan />
                            Scan
                        </Button>
                        <Button variant='destructive' onClick={handleClearReadings}>
                            <SAQI.Icons.System.Clear />
                        </Button>
                    </div>
                    {/* <Readings
                        direction='NULL'
                        distance={goDirection}
                    /> */}
                    <Readings
                        direction='Right'
                        distance={rightDistance}
                    />
                </div>

                <div></div>
            </CardContent>
        </Card>
    )
}

type ReadingsProps = {
    direction: 'Left' | 'Right' | 'NULL';
    distance?: string;
}

const Readings = ({ direction, distance }: ReadingsProps) => {
    return (
        direction === 'NULL'
            ? (
                <p className='text-xl font-bold text-primary'>
                    {distance}
                </p>
            )
            : (
                <p>
                    {direction}{":"} <span className='font-bold'>{distance}</span>
                </p>
            )
    )
}

export default UltrasonicComponent