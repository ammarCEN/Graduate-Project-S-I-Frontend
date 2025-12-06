// const BASE = process.env.NEXT_PUBLIC_API_BASE;

// --- AI Control ---
export const startAI = (BASE: string) => fetch(`${BASE}/vision/toggle/on`);
export const stopAI = (BASE: string) => fetch(`${BASE}/vision/toggle/off`);

// --- Motor Control ---
export const moveForward = (BASE: string, speed = 0.6) =>
    fetch(`${BASE}/motor/move/forward?speed=${speed}`, { method: "POST" });

export const moveBackward = (BASE: string, speed = 0.6) =>
    fetch(`${BASE}/motor/move/backward?speed=${speed}`, { method: "POST" });

export const stopRobot = (BASE: string) =>
    fetch(`${BASE}/motor/stop`, { method: "POST" });

// --- Video Feed ---
export const videoFeedURL = (BASE: string) => `${BASE}/video_feed`;
