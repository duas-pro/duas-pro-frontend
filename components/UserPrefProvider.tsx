'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserPrefContextType {
    selectedLanguage: string;
    setSelectedLanguage: (language: string) => void;
    translationFontSize: number;
    setTranslationFontSize: (size: number) => void;
}

const UserPrefContext = createContext<UserPrefContextType | undefined>(undefined);

interface UserPrefProviderProps {
    children: ReactNode;
}

export const UserPrefProvider = ({ children }: UserPrefProviderProps) => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [translationFontSize, setTranslationFontSize] = useState(3);

    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        const savedFontSize = localStorage.getItem('translationFontSize');

        if (savedLanguage) {
            setSelectedLanguage(savedLanguage);
        }

        if (savedFontSize) {
            setTranslationFontSize(Number(savedFontSize));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedLanguage', selectedLanguage);
    }, [selectedLanguage]);

    useEffect(() => {
        localStorage.setItem('translationFontSize', translationFontSize.toString());
    }, [translationFontSize]);

    return (
        <UserPrefContext.Provider value={{
            selectedLanguage,
            setSelectedLanguage,
            translationFontSize,
            setTranslationFontSize
        }}>
            {children}
        </UserPrefContext.Provider>
    );
};

export const useUserPref = (): UserPrefContextType => {
    const context = useContext(UserPrefContext);
    if (!context) {
        throw new Error('useUserPref must be used within a UserPrefProvider');
    }
    return context;
};
