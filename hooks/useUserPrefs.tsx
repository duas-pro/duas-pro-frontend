import { useState, useEffect } from 'react';

type UserPrefContextType = {
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  translationFontSize: number;
  setTranslationFontSize: (size: number) => void;
};

export const useUserPref = (): UserPrefContextType => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedLanguage') || 'en';
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
