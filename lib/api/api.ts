// --- AI Control ---
export const startAI = async (BASE: string) => {
    try {
        const res = await fetch(`${BASE}/vision/toggle/on`);
        if (!res.ok) return { error: "Couldn't reach endpoint" };
        return await res.json();
    } catch (err: any) {
        console.error("startAI failed:", err);
        return { status: "error", message: "Couldn't reach endpoint" }; // err.message
    }
}

export const stopAI = async (BASE: string) => {
    try {
        const res = await fetch(`${BASE}/vision/toggle/off`);
        if (!res.ok) return { error: "Couldn't reach endpoint" };
        return await res.json();
    } catch (err: any) {
        console.error("stopAI failed:", err);
        return { error: "Couldn't reach endpoint" };
    }
}

// --- Motor Control ---
export const moveForward = async (BASE: string, speed = 0.6) => {
    try {
        const res = await fetch(`${BASE}/motor/move/forward?speed=${speed}`, { method: "POST" });
        if (!res.ok) return { error: "Couldn't reach endpoint" };
        return await res.json();
    } catch (err: any) {
        console.error("moveForward failed:", err);
        return { status: "[UNEXPECTED ERROR]", message: err.message };
    }
}

export const moveBackward = async (BASE: string, speed = 0.6) => {
    try {
        const res = await fetch(`${BASE}/motor/move/backward?speed=${speed}`, { method: "POST" });
        if (!res.ok) return { error: "Couldn't reach endpoint" };
        return await res.json();
    } catch (err: any) {
        console.error("moveBackward failed:", err);
        return { error: "Couldn't reach endpoint" };
    }
}

export const stopRobot = async (BASE: string) => {
    try {
        const res = await fetch(`${BASE}/motor/stop`, { method: "POST" });
        if (!res.ok) return { error: "Couldn't reach endpoint" };
        return await res.json();
    } catch (err: any) {
        console.error("stopRobot failed:", err);
        return { error: "Couldn't reach endpoint" };
    }
}

// --- Video Feed ---
export const videoFeedURL = (BASE: string) => `${BASE}/video_feed`;
