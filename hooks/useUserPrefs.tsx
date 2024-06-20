import { Language } from '@/components/TextContent'; // Stelle sicher, dass der Pfad korrekt ist
import { useState, useEffect } from 'react';

type UserPrefContextType = {
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
  translationFontSize: number;
  setTranslationFontSize: (size: number) => void;
};

export const useUserPref = (): UserPrefContextType => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('selectedLanguage');
      return (storedLanguage as Language) || 'en';
    }
    return 'en';
  });

  const [translationFontSize, setTranslationFontSize] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('translationFontSize') || '2', 10);
    }
    return 2;
  });

  useEffect(() => {
    localStorage.setItem('selectedLanguage', selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    localStorage.setItem('translationFontSize', translationFontSize.toString());
  }, [translationFontSize]);

  return {
    selectedLanguage,
    setSelectedLanguage,
    translationFontSize,
    setTranslationFontSize,
  };
};
