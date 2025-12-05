const BASE = process.env.NEXT_PUBLIC_API_BASE;

// --- AI Control ---
export const startAI = () => fetch(`${BASE}/vision/toggle/on`);
export const stopAI = () => fetch(`${BASE}/vision/toggle/off`);

// --- Motor Control ---
export const moveForward = (speed = 0.6) =>
    fetch(`${BASE}/motor/move/forward?speed=${speed}`, { method: "POST" });

export const moveBackward = (speed = 0.6) =>
    fetch(`${BASE}/motor/move/backward?speed=${speed}`, { method: "POST" });

export const stopRobot = () =>
    fetch(`${BASE}/motor/stop`, { method: "POST" });

// --- Video Feed ---
// export const videoFeedURL = () => `${BASE}/video_feed`;
export const videoFeedURL = () => "http://192.168.8.183:8081";
