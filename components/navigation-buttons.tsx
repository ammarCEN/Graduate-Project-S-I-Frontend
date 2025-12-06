'use client';

import { moveBackward, moveForward } from '@/lib/api/api';
import { Button } from './ui/button'
import { MoveUp, MoveDown, MoveLeft, MoveRight, Siren } from "lucide-react";
import { getSpeed } from '@/lib/speed';
import useConnection from '@/app/providers/api-provider';
import { Card } from './ui/card';
import { toast } from 'sonner';


const NavigationButtons = () => {
    const buttonSize = "";

    const { apiBase } = useConnection();

    const handleMovingForward = () => {
        if (!apiBase) {
            toast.error("No connection!");
            return
        }
        moveForward(apiBase, getSpeed());
    }

    const handleMovingBackward = () => {
        if (!apiBase) {
            toast.error("No connection!");
            return
        }
        moveBackward(apiBase, getSpeed());
    }

    return (
        <Card>
            <div className="flex flex-col items-center justify-center gap-4">

                {/* زر التحرك للأعلى */}
                <Button className={buttonSize} onClick={handleMovingForward}>
                    <MoveUp />
                </Button>

                {/* صف أزرار اليسار واليمين + زر الطوارئ في الوسط */}
                <div className="flex items-center gap-4">
                    <Button className={buttonSize}>
                        <MoveLeft />
                    </Button>

                    {/* زر الطوارئ في الوسط */}
                    <Button className="bg-red-600 hover:bg-red-700 text-white h-full">
                        Emergency Stop <Siren />
                    </Button>

                    <Button className={buttonSize}>
                        <MoveRight />
                    </Button>
                </div>

                {/* زر التحرك للأسفل */}
                <Button className={buttonSize} onClick={handleMovingBackward}>
                    <MoveDown />
                </Button>

            </div>
        </Card>

    )
}

export default NavigationButtons