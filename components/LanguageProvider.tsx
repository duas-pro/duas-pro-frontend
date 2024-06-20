'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface LanguageContextType {
    selectedLanguage: string;
    setSelectedLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');

    // Load language from localStorage
    useEffect(() => {
        const storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage) {
            setSelectedLanguage(storedLanguage);
        }
    }, []);

    // Save language to localStorage
    useEffect(() => {
        localStorage.setItem('selectedLanguage', selectedLanguage);
    }, [selectedLanguage]);

    return (
        <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
