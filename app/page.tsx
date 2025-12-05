import CameraViewer from "@/components/camera-viewer";
import Header from "@/components/header";
import NavigationButtons from "@/components/navigation-buttons";
import SearchIP from "@/components/searchIP";
import SpeedSlider from "@/components/speed-slider";
import { Separator } from "@radix-ui/react-dropdown-menu";


export default function Home() {
  return (
    // <div className="flex flex-col p-12 gap-4">
    //   <Header />
    //   <Separator className="border" />
    //   <SearchIP />
    //   <CameraViewer />
    //   <NavigationButtons />
    //   <SpeedSlider />
    // </div>



    <div className="flex flex-col p-12 gap-4">
      <Header />
      <Separator className="border" />
      <SearchIP />

      <main className="flex flex-col md:flex-row gap-8">
        {/* Left side for camera */}
        <div className="md:w-1/2 w-full">
          <CameraViewer />
        </div>

        {/* Right side for buttons */}
        <div className="md:w-1/2 w-full flex flex-col gap-4 border p-16">
          <NavigationButtons />
          <SpeedSlider />
        </div>
      </main>
    </div>


  );
}
