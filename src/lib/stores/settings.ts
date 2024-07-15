import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Definieren Sie die Typen
export type Theme = 'light' | 'dark';
export type Language = 'de' | 'en';

export interface LanguageItem {
    value: string;
    label: string;
    id: string;
}

// Definieren Sie das Interface für die Einstellungen
interface Settings {
    fontSize: number;
    theme: Theme;
    systemLanguage: Language;
    selectedLanguages: LanguageItem[];
}

// Hilfsfunktion zum Laden der Einstellungen aus dem localStorage
function loadSettings(): Settings {
    if (browser) {
        const savedSettings = localStorage.getItem('settings');
        if (savedSettings) {
            return JSON.parse(savedSettings);
        }
    }
    return {
        fontSize: 16,
        theme: browser && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
        systemLanguage: 'de',
        selectedLanguages: []
    };
}

// Erstellen Sie den Store mit Initialwerten
const initialSettings: Settings = loadSettings();

export const settingsStore = writable<Settings>(initialSettings);

// Subscriptions für Persistenz
if (browser) {
    settingsStore.subscribe((settings) => {
        localStorage.setItem("settings", JSON.stringify(settings));
        document.documentElement.style.setProperty('--arabic-font-size', settings.fontSize + 'px');
    });
}

// Hilfsfunktionen für Typkonvertierung
export function stringToTheme(value: string): Theme {
    return value === 'dark' ? 'dark' : 'light';
}

export function stringToLanguage(value: string): Language {
    return value === 'en' ? 'en' : 'de';
}