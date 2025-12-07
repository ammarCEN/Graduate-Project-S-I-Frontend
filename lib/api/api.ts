// const BASE = process.env.NEXT_PUBLIC_API_BASE;

// --- AI Control ---
export const startAI = async (BASE: string) => {
    const res = await fetch(`${BASE}/vision/toggle/on`);
    return res.json();
}

export const stopAI = async (BASE: string) => {
    const res = await fetch(`${BASE}/vision/toggle/off`);
    return res.json();
}

// --- Motor Control ---
export const moveForward = async (BASE: string, speed = 0.6) => {
    const res = await fetch(`${BASE}/motor/move/forward?speed=${speed}`, { method: "POST" });
    return res.json();
}

export const moveBackward = async (BASE: string, speed = 0.6) => {
    const res = await fetch(`${BASE}/motor/move/backward?speed=${speed}`, { method: "POST" });
    return res.json();
}

export const stopRobot = async (BASE: string) => {
    const res = await fetch(`${BASE}/motor/stop`, { method: "POST" });
    return res.json();
}

// --- Video Feed ---
export const videoFeedURL = (BASE: string) => `${BASE}/video_feed`;
