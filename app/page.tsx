// 'use client';

import AIAssistant from "@/components/ai-assistant";
import CameraViewer from "@/components/camera-viewer";
import Header from "@/components/header";
import LiveLogger from "@/components/live-log";
import NavigationButtons from "@/components/navigation-buttons";
import SearchIP from "@/components/searchIP";
import SpeedSlider from "@/components/speed-slider";
import StatusIndicator from "@/components/status-indicator";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";


export default function Home() {
  return (
    <div className="flex flex-col p-6 gap-4 md:p-12 md:gap-6">
      <Header />
      <SearchIP />



      <main className="flex flex-col md:flex-row gap-8">
        {/* Left side for camera */}
        <Card className="md:w-1/2 w-full p-6">
          <CameraViewer />
        </Card>

        {/* Right side for buttons */}
        <Card className="md:w-1/2 w-full flex flex-col gap-4 p-4 lg:p-12">
          <NavigationButtons />
          <SpeedSlider />
          <AIAssistant />
        </Card>
      </main>



      <footer>
        <LiveLogger />
      </footer>
    </div>


  );
}
