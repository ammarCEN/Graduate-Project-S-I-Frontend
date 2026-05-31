import { cn } from '@/lib/utils'
import MotorNavigationButtons from './motor-navigation-buttons'
import CameraNavigationButtons from './camera-navigation-buttons'
import {
    Tabs,
    TabsContent,
    TabsContents,
    TabsList,
    TabsTrigger,
} from '@/components/animate-ui/components/animate/tabs';
import { SAQI } from '@/lib/saqi.index';
import UltrasonicComponent from './ultrasonic-component';

const ControlTaps = () => {
    return (
        <Tabs className={cn(
            "md:w-1/2 w-full"
        )}>
            <TabsList>
                <TabsTrigger value="motor">{<SAQI.Icons.Titles.MotorMovement />} Movement controller</TabsTrigger>
                <TabsTrigger value="camera">{<SAQI.Icons.Titles.CameraMovement />} Camera controller</TabsTrigger>
                <TabsTrigger value="ultrasonic">{<SAQI.Icons.Titles.Ultrasonic />} Distance controller</TabsTrigger>
            </TabsList>
            <TabsContents className='border rounded-xl shadow-sm'>
                <TabsContent value="motor">
                    <MotorNavigationButtons />
                </TabsContent>
                <TabsContent value="camera">
                    <CameraNavigationButtons />
                </TabsContent>
                <TabsContent value="ultrasonic">
                    <UltrasonicComponent />
                </TabsContent>
            </TabsContents>
        </Tabs>
    )
}

export default ControlTaps