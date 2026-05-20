'use client';

import { Card, CardContent } from './ui/card';
import MovementButton, { Direction } from './single-navigation-button';
import { PiTireDuotone } from "react-icons/pi";
import HeaderComponent from './header-component';
import SpeedSlider from './speed-slider';

const MotorNavigationButtons = () => {
    return (
        <Card>
            <CardContent>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <HeaderComponent
                        title='Movement Buttons'
                        description='These bottom buttons are interactive navigation buttons to start moving until unclick and then automatically stopping the robot.'
                        icon={PiTireDuotone}
                    />
                    <div className='flex flex-col items-center justify-center gap-2'>
                        {/* Forward */}
                        <MovementButton action={Direction.Forward} />

                        {/* Middle row: Left, Emergency Stop, Right */}
                        <div className='flex items-center justify-center gap-2'>
                            <MovementButton action={Direction.Left} />
                            <MovementButton action={Direction.Stop} />
                            <MovementButton action={Direction.Right} />
                        </div>

                        {/* Backward */}
                        <MovementButton action={Direction.Backward} />
                    </div>

                    {/* Speed slider */}
                    <SpeedSlider />

                </div>
            </CardContent>
        </Card>

    )
}

export default MotorNavigationButtons