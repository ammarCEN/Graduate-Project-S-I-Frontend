import { AiCameraFeed, cameraMoveDown, cameraMoveLeft, cameraMoveRight, cameraMoveUp, cameraSetCenter, cameraStop, cameraZoom, ManualCameraFeed, motorMoveBackward, motorMoveForward, motorMoveLeft, motorMoveRight, motorStop, PumpOff, PumpOn, PumpStatus, UltrasonicDistance } from "./api";


const Motor = {
    Move: {
        Forward: motorMoveForward,
        Backward: motorMoveBackward,
        Left: motorMoveLeft,
        Right: motorMoveRight,
    },
    Stop: motorStop,
}

const Camera = {
    Move: {
        Up: cameraMoveUp,
        Down: cameraMoveDown,
        Left: cameraMoveLeft,
        Right: cameraMoveRight,
    },
    Stop: cameraStop,
    Center: cameraSetCenter,
    Zoom: cameraZoom,
}

const Pump = {
    Active: PumpOn,
    Deactivate: PumpOff,
    Status: PumpStatus,
}

const VideoFeed = {
    Manual: ManualCameraFeed,
    Auto: AiCameraFeed,
}

const Ultrasonic = {
    getDistance: UltrasonicDistance,
}

export const Robot = {
    Motor,
    Camera,
    Ultrasonic,
    Pump,
    VideoFeed,
}