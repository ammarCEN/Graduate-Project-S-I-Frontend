'use client';

import AIAssistant from "@/components/ai-assistant";
import CameraViewer from "@/components/camera-viewer";
import Header from "@/components/header";
import MotorNavigationButtons from "@/components/motor-navigation-buttons";
import PumpControl from "@/components/pump-control";
import SearchIP from "@/components/searchIP";
import { Card, CardContent } from "@/components/ui/card";
import { SelectSeparator } from "@/components/ui/select";
import useConnection from "./providers/api-provider";
import { cn } from "@/lib/utils";
import CameraNavigationButtons from "@/components/camera-navigation-buttons";
import ControlTaps from "@/components/control-taps";

export default function Home() {
  const { isVisionOn } = useConnection();
  return (
    <div className="flex flex-col p-6 gap-4 md:p-12 md:gap-6">
      <Header />
      <SearchIP />

      <div className="flex gap-6 items-center flex-col md:flex-row">
        <AIAssistant />
        {!isVisionOn && (
          <PumpControl />
        )}
      </div>

      <div
        className={cn(
          "flex flex-col md:flex-row gap-6 transition-all duration-500",
          // isVisionOn ? "gap-4" : "gap-8"
        )}
      >
        {/* Left side for camera */}
        <Card
          className={cn(
            !isVisionOn && "mt-11",

            "p-6 transition-all duration-500",

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
