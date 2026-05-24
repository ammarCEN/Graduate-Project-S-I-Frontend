const System = {
    No_Connection: "No connection !",
    Robot_Not_Connected: " — Robot not connected",
}

const Success = {
    Vision: {
        On: "Vision on",
        Off: "Vision off"
    }
}

const Waiting = {
    Camera_Fetch: (hostname: string) => "Trying to fetch camera feed → " + hostname,
}

const Warning = {

}

const Failed = {
    Vision: "Cannot toggle vision" + System.Robot_Not_Connected,
    Pump: "Cannot toggle pump" + System.Robot_Not_Connected,
    Movement: {
        Connecting: "Cannot move" + System.Robot_Not_Connected,
        Error_Moving: (direction: string, err: string) => `Cannot moving ${direction}: ${err}`,
        Error_Stopping: (err: string) => "Error stopping: " + err
    },
    Camera: {
        NotConnected_Fetch: "Cannot fetch camera feed" + System.Robot_Not_Connected,
        Connected_Fetch: "Camera feed failed to fetch",
        Center: "Cannot center camera" + System.Robot_Not_Connected,
        Zoom_Slider: "Cannot adjust zoom" + System.Robot_Not_Connected,
        Zoom_Out: "Cannot zoom out camera" + System.Robot_Not_Connected,
        Zoom_In: "Cannot zoom in camera" + System.Robot_Not_Connected,
    },
}

export const Logs = {
    System,
    Success,
    Waiting,
    Warning,
    Failed,
}