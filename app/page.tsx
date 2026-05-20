'use client';

import AIAssistant from "@/components/ai-assistant";
import CameraViewer from "@/components/camera-viewer";
import Header from "@/components/header";
import NavigationButtons from "@/components/navigation-buttons";
import PumpControl from "@/components/pump-control";
import SearchIP from "@/components/searchIP";
import SpeedSlider from "@/components/speed-slider";
import { Card } from "@/components/ui/card";
import { SelectSeparator } from "@/components/ui/select";
import useConnection from "./providers/api-provider";
import { cn } from "@/lib/utils";
import CameraNavigationButtons from "@/components/camera-navigation-buttons";

export default function Home() {
  const { isVisionOn } = useConnection();
  return (
    <div className="flex flex-col p-6 gap-4 md:p-12 md:gap-6">
      <Header />
      <SearchIP />

      <main
        className={cn(
          "flex flex-col md:flex-row gap-8 transition-all duration-300",
          isVisionOn ? "gap-4" : "gap-8"
        )}
      >
        {/* Left side for camera */}
        <Card
          className={cn(
            "p-6 transition-all duration-300",
            isVisionOn ? "w-[50%]" : "md:w-1/2 w-full"
          )}
        >
          <CameraViewer />
          <div
            className={cn(
              "mt-4 transition-opacity duration-300",
              isVisionOn ? "opacity-100" : "hidden"
            )}
          >
            <AIAssistant />
          </div>
        </Card>

        {/* Right side for buttons */}
        {!isVisionOn && (
          <div className="transition-all duration-300 md:w-1/2 w-full">
            <Card className="flex flex-col gap-4 p-4 lg:p-12">
              <NavigationButtons />
              <CameraNavigationButtons />
              <SpeedSlider />
              <SelectSeparator />
              <AIAssistant />
              <PumpControl />
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
