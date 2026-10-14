import { browser } from '$app/environment';

declare global {
    interface Window {
        dataLayer: any[];
    }
}

export function trackGtmEvent(event: string, payload?: Record<string, unknown>) {
    if (!browser) return;

    // Wait for the next tick to ensure GTM script has initialized the dataLayer array
    // and Svelte DOM updates are flushed.
    setTimeout(() => {
        window.dataLayer = window.dataLayer || [];
        
        const data = {
            event: event,
            ...payload
        };
        
        window.dataLayer.push(data);
    }, 0);
}