import { Siren } from "lucide-react";
import { BsCameraVideo } from "react-icons/bs";
import { FaAngleDoubleUp } from "react-icons/fa";
import { MdOutlineBlurOff } from "react-icons/md";
import { TbArrowMoveUp, TbZoomPan } from "react-icons/tb";
import { GrZoomIn, GrZoomOut } from "react-icons/gr";
import { RiDragMoveLine } from "react-icons/ri";
import { PiTireDuotone } from "react-icons/pi";


const System = {
    Header: {},
    IPSearch: {},
}

const Titles = {
    MotorMovement: PiTireDuotone,
    CameraMovement: BsCameraVideo,
    // AIAssistant: ,
    // Pump: ,
}

const Controls = {
    Motor: {
        Move: FaAngleDoubleUp,
        Stop: Siren,
        // Slider: ,
    },
    Camera: {
        Move: TbArrowMoveUp,
        Stop: MdOutlineBlurOff,
        Slider: TbZoomPan,
        Center: RiDragMoveLine,
        Zoom: {
            Max_Zoom: GrZoomIn,
            Min_Zoom: GrZoomOut,
        }
    },
}

export const Icons = {
    Controls,
    Titles,
    System,
}