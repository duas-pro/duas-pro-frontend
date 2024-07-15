import { writable } from 'svelte/store';

export const isLiveReading = writable(false);
export const liveReadingCode = writable('');
export const liveReadingUsers = writable(0);
