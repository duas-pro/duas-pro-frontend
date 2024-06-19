// context/LanguageContext.js
'use client';

import { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext("");

export const LanguageProvider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('');

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

export const useLanguage = () => useContext(LanguageContext);
