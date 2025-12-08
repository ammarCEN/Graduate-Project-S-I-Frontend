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
export const startAI = (BASE: string) =>
    safeFetch(fetch(`${BASE}/vision/toggle/on`, { method: "POST" }));

export const stopAI = (BASE: string) =>
    safeFetch(fetch(`${BASE}/vision/toggle/off`, { method: "POST" }));

// --- Motor Control ---
export const moveForward = (BASE: string, speed = 0.6) =>
    safeFetch(fetch(`${BASE}/motor/move/forward?speed=${speed}`, { method: "POST" }));

export const moveBackward = (BASE: string, speed = 0.6) =>
    safeFetch(fetch(`${BASE}/motor/move/backward?speed=${speed}`, { method: "POST" }));

export const stopRobot = (BASE: string) =>
    safeFetch(fetch(`${BASE}/motor/stop`, { method: "POST" }));

// --- Video Feed ---
export const videoFeedURL = (BASE: string) => `${BASE}/video_feed`;
