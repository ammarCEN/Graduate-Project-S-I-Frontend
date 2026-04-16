function extractPreContent(html: string) {
    const match = html.match(/<pre>([\s\S]*?)<\/pre>/i);
    return match ? match[1] : html;
}

async function safeFetch<T>(fetchPromise: Promise<Response>): Promise<T & { error?: string }> {
    try {
        const res = await fetchPromise;
        if (!res.ok) {
            const text = await res.text().catch(() => "");
            return { ERROR: `Endpoint returned ${res.status}: ${extractPreContent(text)}` } as any;
        }
        return await res.json();
    } catch (err: any) {
        console.error("Fetch failed:", err);
        return { ERROR: `[UNEXPECTED ERROR] ${err.message}` } as any;
    }
}




// --- AI Control ---
// export const startAI = (BASE: string) =>
//     safeFetch(fetch(`${BASE}/ai/detect`, { method: "GET", cache: 'no-store' }));

// export const startAI = (BASE: string) =>
//     safeFetch(fetch(`${BASE}/vision/toggle/on`, { method: "POST", cache: 'no-store' }));

// export const stopAI = (BASE: string) =>
//     safeFetch(fetch(`${BASE}/vision/toggle/off`, { method: "POST", cache: 'no-store' }));






// --- Motor Control ---
export const moveForward = (BASE: string, speed = 0.6) =>
    safeFetch(fetch(`${BASE}/motor/move?direction=forward&speed=${speed}`, { method: "POST", cache: 'no-store' }));

export const moveBackward = (BASE: string, speed = 0.6) =>
    safeFetch(fetch(`${BASE}/motor/move?direction=backward&speed=${speed}`, { method: "POST", cache: 'no-store' }));

export const moveRight = (BASE: string, speed = 0.6) =>
    safeFetch(fetch(`${BASE}/motor/move?direction=right&speed=${speed}`, { method: "POST", cache: 'no-store' }));

export const moveLeft = (BASE: string, speed = 0.6) =>
    safeFetch(fetch(`${BASE}/motor/move?direction=left&speed=${speed}`, { method: "POST", cache: 'no-store' }));

export const stopRobot = (BASE: string) =>
    safeFetch(fetch(`${BASE}/motor/stop`, { method: "POST", cache: 'no-store' }));





// --- Pump Control ---
export const PumpOn = (BASE: string) =>
    safeFetch(fetch(`${BASE}/pump/on`, { method: "POST", cache: 'no-store' }));

export const PumpOff = (BASE: string) =>
    safeFetch(fetch(`${BASE}/pump/off`, { method: "POST", cache: 'no-store' }));

export const PumpStatus = (BASE: string) =>
    safeFetch(fetch(`${BASE}/pump/status`, { method: "GET", cache: 'no-store' }));





// --- Video Feed ---
// export const PureCameraFeed = (BASE: string) => `${BASE}/camera/feed`;
// export const AICameraFeed = (BASE: string) => `${BASE}/ai/detect`;

export const ManualCameraFeed = (BASE: string) => `${BASE}/camera/feed?mode=manual`;
export const AiCameraFeed = (BASE: string) => `${BASE}/camera/feed?mode=automatic`;


