import { cn } from '@/lib/utils'
import React from 'react'
import MotorNavigationButtons from './motor-navigation-buttons'
import CameraNavigationButtons from './camera-navigation-buttons'
import {
    Tabs,
    TabsContent,
    TabsContents,
    TabsList,
    TabsTrigger,
} from '@/components/animate-ui/components/animate/tabs';

const ControlTaps = () => {
    return (
        <Tabs className={cn(
            "md:w-1/2 w-full"
        )}>
            <TabsList>
                <TabsTrigger value="motor">Movement controller</TabsTrigger>
                <TabsTrigger value="camera">Camera controller</TabsTrigger>
            </TabsList>
            <TabsContents className='border rounded-xl shadow-sm'>
                <TabsContent value="motor">
                    <MotorNavigationButtons />
                </TabsContent>
                <TabsContent value="camera">
                    <CameraNavigationButtons />
                </TabsContent>
            </TabsContents>
        </Tabs>
        // <div className={cn(
        //     "transition-all duration-300 md:w-1/2 w-full",
        //     "flex flex-col gap-6"
        // )}>
        //     <MotorNavigationButtons />
        //     <CameraNavigationButtons />
        // </div>
    )
}

export default ControlTaps