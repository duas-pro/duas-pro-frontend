import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';
export type SystemLanguage = 'de' | 'en';
export type LanguageCode = string;

export interface LanguageItem {
    value: LanguageCode;
    label: string;
}

interface Settings {
    theme: Theme;
    systemLanguage: SystemLanguage;
    primaryDuaLanguage: LanguageCode;
    secondaryDuaLanguage: LanguageCode;
    tertiaryDuaLanguage: LanguageCode;
    primaryDuaFontSize: number;
    secondaryDuaFontSize: number;
    tertiaryDuaFontSize: number;
}

export const languages: LanguageItem[] = [
    { value: 'ar', label: 'Arabic' },
    { value: 'translit', label: 'Transliteration' },
    { value: 'en', label: 'English' },
];

function loadSettings(): Settings {
    if (browser) {
        const savedSettings = localStorage.getItem('settings');
        if (savedSettings) {
            return JSON.parse(savedSettings);
        }
    }
    return {
        theme: browser && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
        systemLanguage: 'de',
        primaryDuaLanguage: 'ar',
        secondaryDuaLanguage: 'translit',
        tertiaryDuaLanguage: 'en',
        primaryDuaFontSize: 16,
        secondaryDuaFontSize: 16,
        tertiaryDuaFontSize: 16
    };
}

const initialSettings: Settings = loadSettings();

export const settingsStore = writable<Settings>(initialSettings);

if (browser) {
    console.log("hhhhh")
    settingsStore.subscribe((settings) => {
        localStorage.setItem("settings", JSON.stringify(settings));
        document.documentElement.style.setProperty('--primary-dua-font-size', settings.primaryDuaFontSize + 'px');
        document.documentElement.style.setProperty('--secondary-dua-font-size', settings.secondaryDuaFontSize + 'px');
        document.documentElement.style.setProperty('--tertiary-dua-font-size', settings.tertiaryDuaFontSize + 'px');
    });
}

export function getLanguageLabel(code: LanguageCode): string {
    return languages.find(lang => lang.value === code)?.label || code;
}

export function stringToTheme(value: string): Theme {
    return value === 'dark' ? 'dark' : 'light';
}

export function stringToSystemLanguage(value: string): SystemLanguage {
    return value === 'en' ? 'en' : 'de';
}