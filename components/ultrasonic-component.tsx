'use client';

import useSWR from "swr";
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button';
import HeaderComponent from './header-component';
import { SAQI } from '@/lib/saqi.index';
import useConnection from '@/app/providers/api-provider';
import { toast } from 'sonner';

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
    const distance = "---";
    const leftDistance = "---";
    const rightDistance = "---";

    const handleGetDistance = async () => {
        if (!apiBase) {
            toast.error(SAQI.Logs.System.No_Connection);
            addLog(SAQI.Logs.Failed.Ultrasonic);
            return
        }

        const data = await SAQI.Robot.Ultrasonic.getDistance(apiBase);
        addLog(data);
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
                    {distance}
                </h1>
                <div className={cn(
                    'flex gap-12',
                    'border rounded-xl px-4 py-2',
                    'text-lg font-900',
                    // "transition-all duration-500"
                )}>
                    {/* <p>
                        Left: <span className='text-destructive'>{leftDistance}</span>
                    </p>
                    <p className='text-xl font-bold text-primary'>
                        {goDirection}
                    </p>
                    <p>
                        Right: <span className=''>{rightDistance}</span>
                    </p> */}
                    <Readings
                        direction='Left'
                        distance={leftDistance}
                    />
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
                <Button variant='outline' onClick={handleGetDistance}>
                    Get distance
                </Button>
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
                    {direction}{":"} {distance}
                </p>
            )
    )
}

export default UltrasonicComponent