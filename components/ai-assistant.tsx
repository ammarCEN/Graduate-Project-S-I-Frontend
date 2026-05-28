'use client';

import useConnection from "@/app/providers/api-provider";
import { Switch } from "./ui/switch";
import { toast } from "sonner";
import HeaderComponent from "./header-component";
import { GiBrain } from "react-icons/gi";
import TouchableCard from "./touchable-card";
import { SAQI } from "@/lib/saqi.index";



const AIAssistant = () => {
    const { apiBase, addLog } = useConnection();
    const { isVisionOn, setIsVisionOn } = useConnection();

    const handleToggleVision = async () => {
        if (!apiBase) {
            toast.error(SAQI.Logs.System.No_Connection);
            addLog(SAQI.Logs.Failed.Vision);
            return;
        }

        let data;
        if (isVisionOn) {
            setIsVisionOn(false);
            data = SAQI.Logs.Success.Vision.Off;
        }
        else {
            setIsVisionOn(true);
            data = SAQI.Logs.Success.Vision.On;
        }
        addLog(data);
    }
    return (
        <TouchableCard
            theme='plant'
            value={isVisionOn}
            handleValueToggle={handleToggleVision}
        >
            <HeaderComponent
                title='AI Assistant'
                description='Switch between manual and autonomous control'
                icon={GiBrain}
            />

            {/* <Switch
                disabled={!isConnected}
                checked={isVisionOn}
                onCheckedChange={handleToggleVision}
            /> */}
        </TouchableCard>
        // <Card
        //     className={cn(
        //         "w-full",

        //         "cursor-pointer",

        //         "relative overflow-hidden transition-all duration-800 shadow-lg hover:shadow-xl", // Enhanced shadow for futuristic feel

        //         // Light mode
        //         "bg-gradient-to-br from-primary/5 to-primary/50 ",

        //         // Dark mode
        //         "dark:bg-gradient-to-br dark:from-primary/50 dark:to-primary/20",
        //     )}
        //     onClick={handleToggleVision}
        // >
        //     {/* Futuristic Glow Effect */}
        //     <div
        //         className={cn(
        //             "absolute -inset-1 blur-3xl opacity-30", // Increased blur and opacity for a glowing effect
        //             "bg-gradient-to-r from-primary via-primary/70 to-background/50", // Cooler gradient for a tech feel
        //             "dark:opacity-40"
        //         )}
        //     />

        //     <CardContent className="relative flex justify-between items-center">
        //         <HeaderComponent
        //             title='AI Assistant'
        //             description='Enable or disable AI classification boxes.'
        //             icon={GiBrain}
        //         />

        //         <Switch
        //             disabled={!isConnected}
        //             checked={isVisionOn}
        //             onCheckedChange={handleToggleVision}
        //             className={cn(
        //                 "data-[state=checked]:bg-gradient-to-r", // Gradient for checked state
        //                 "data-[state=checked]:from-primary/60", // Start of gradient
        //                 "data-[state=checked]:via-background/30", // Start of gradient
        //                 "data-[state=checked]:to-primary", // End of gradient
        //             )}
        //         />
        //     </CardContent>
        // </Card>
    )
}

export default AIAssistant