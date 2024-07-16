import { writable } from 'svelte/store';

interface LiveReadingState {
    isLiveReading: boolean;
    liveReadingCode: string | null;
    liveReadingUsers: number;
}

export const liveReadingStore = writable<LiveReadingState>({
  isLiveReading: false,
  liveReadingCode: '',
  liveReadingUsers: 0,
});
