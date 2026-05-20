import { Siren } from "lucide-react";
import { FaAngleDoubleUp } from "react-icons/fa";
import { MdOutlineBlurOff } from "react-icons/md";
import { TbArrowMoveUp } from "react-icons/tb";

const Controls = {
    Motor: {
        Move: FaAngleDoubleUp,
        Stop: Siren,
        // Slider: ,
    },
    Camera: {
        Move: TbArrowMoveUp,
        Stop: MdOutlineBlurOff,
        // Slider: ,
        // Center: ,
        // Zoom: {
        //     In: ,
        //     Out: ,
        // }
    },
}

export const Icons = {
    Controls,
}