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


// --- Motor Control ---
export const motorMoveForward = (BASE: string, speed = 0.6) =>
    safeFetch(fetch(`${BASE}/motor/move?direction=forward&speed=${speed}`, { method: "POST", cache: 'no-store' }));

export const motorMoveBackward = (BASE: string, speed = 0.6) =>
    safeFetch(fetch(`${BASE}/motor/move?direction=backward&speed=${speed}`, { method: "POST", cache: 'no-store' }));

export const motorMoveRight = (BASE: string, speed = 0.6) =>
    safeFetch(fetch(`${BASE}/motor/move?direction=right&speed=${1}`, { method: "POST", cache: 'no-store' }));

export const motorMoveLeft = (BASE: string, speed = 0.6) =>
    safeFetch(fetch(`${BASE}/motor/move?direction=left&speed=${1}`, { method: "POST", cache: 'no-store' }));

export const motorStop = (BASE: string) =>
    safeFetch(fetch(`${BASE}/motor/stop`, { method: "POST", cache: 'no-store' }));




// --- Camera Control ---
export const cameraMoveUp = (BASE: string, speed = 50) =>
    safeFetch(fetch(`${BASE}/camera/ptz/move?direction=up&speed=${speed}`, { method: "POST", cache: 'no-store' }));

export const cameraMoveDown = (BASE: string, speed = 50) =>
    safeFetch(fetch(`${BASE}/camera/ptz/move?direction=down&speed=${speed}`, { method: "POST", cache: 'no-store' }));

export const cameraMoveRight = (BASE: string, speed = 50) =>
    safeFetch(fetch(`${BASE}/camera/ptz/move?direction=right&speed=${speed}`, { method: "POST", cache: 'no-store' }));

export const cameraMoveLeft = (BASE: string, speed = 50) =>
    safeFetch(fetch(`${BASE}/camera/ptz/move?direction=left&speed=${speed}`, { method: "POST", cache: 'no-store' }));

export const cameraSetCenter = (BASE: string) =>
    safeFetch(fetch(`${BASE}/camera/ptz/center`, { method: "POST", cache: 'no-store' }));

export const cameraZoom = (BASE: string, level = 1) =>
    safeFetch(fetch(`${BASE}/camera/ptz/zoom?level=${level}`, { method: "POST", cache: 'no-store' }));

export const cameraStop = (BASE: string) =>
    safeFetch(fetch(`${BASE}/camera/ptz/stop`, { method: "POST", cache: 'no-store' }));









// --- Pump Control ---
export const PumpOn = (BASE: string) =>
    safeFetch(fetch(`${BASE}/pump/on`, { method: "POST", cache: 'no-store' }));

export const PumpOff = (BASE: string) =>
    safeFetch(fetch(`${BASE}/pump/off`, { method: "POST", cache: 'no-store' }));

export const PumpStatus = (BASE: string) =>
    safeFetch(fetch(`${BASE}/pump/status`, { method: "GET", cache: 'no-store' }));


// Ultrasonic Control
export const UltrasonicDistance = (BASE: string) =>
    safeFetch(fetch(`${BASE}/ultrasonic/scan`, { method: "GET", cache: 'no-store' }));


// --- Video Feed ---
export const ManualCameraFeed = (BASE: string) => `${BASE}/camera/feed?mode=manual`;

export const AiCameraFeed = (BASE: string) => `${BASE}/camera/feed?mode=automatic`;


