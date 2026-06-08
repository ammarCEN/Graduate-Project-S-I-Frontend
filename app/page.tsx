'use client';

import AIAssistant from "@/components/ai-assistant";
import CameraViewer from "@/components/camera-viewer";
import Header from "@/components/header";
import PumpControl from "@/components/pump-control";
import { Card } from "@/components/ui/card";
import useConnection from "./providers/api-provider";
import { cn } from "@/lib/utils";
import ControlTaps from "@/components/control-taps";

export default function Home() {
  const { isVisionOn, isPumpOn } = useConnection();
  return (
    <div className={cn(
      "flex flex-col",

      "p-6 gap-4",

      "md:p-12 md:gap-6",

      // light mode
      // "bg-gradient-to-r from-slate-50 to-gray-50",

      // dark mode
      // "dark:bg-gradient-to-r dark:from-zinc-900 dark:to-neutral-900",

    )}>
      <Header />

      <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row">
        <AIAssistant />
        {!isVisionOn && (
          <>
            <PumpControl />
          </>
        )}
      </div>

      <div
        className={cn(
          "flex flex-col md:flex-row gap-6",

          // isVisionOn ? "gap-4" : "gap-8"
        )}
      >
        {/* Left side for camera */}
        <Card
          className={cn(
            !isVisionOn && "mt-4 md:mt-11",

            "p-6",

            // isVisionOn ? "w-[50%]" : "md:w-1/2 w-full" 
            isVisionOn ? "w-full" : "md:w-1/2 w-full"
          )}
        >
          <CameraViewer />
        </Card>

        {/* Right side for buttons */}
        {!isVisionOn && (
          <ControlTaps />
        )}
      </div>
    </div>
  );
}
