'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserPrefContext = createContext("");

export const UserPrefProvider = ({ children }) => {
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
        localStorage.setItem('translationFontSize', translationFontSize);
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

export const useUserPref = () => useContext(UserPrefContext);
