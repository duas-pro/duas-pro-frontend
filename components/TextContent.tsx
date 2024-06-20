'use client';

import { useUserPref } from "@/hooks/useUserPrefs";

type Line = {
  ar: string;
  tx: string;
  en: string;
  de?: string;
  es?: string;
  fr?: string;
  tr?: string;
  [key: string]: string | undefined; // Erlaubt zusätzliche dynamische Schlüssel, aber als string | undefined
};

type Props = {
  textLines: Record<string, Line>;
};

export type Language = 'ar' | 'tx' | 'en' | 'de' | 'es' | 'fr' | 'tr';

export default function TextContent({ textLines }: Props) {
  const { selectedLanguage, translationFontSize } = useUserPref();

  const fontSizeClass = () => {
    switch (translationFontSize) {
      case 1:
        return 'text-xs';
      case 2:
        return 'text-sm';
      case 3:
        return 'text-base';
      case 4:
        return 'text-lg';
      case 5:
        return 'text-xl';
      case 6:
        return 'text-2xl';
      default:
        return 'text-base';
    }
  };

  // Convert the lines object to an array
  const ctextLines = Object.keys(textLines).map(key => ({
    line_number: key,
    ...textLines[key]
  }));

  return (
    <>
      {ctextLines.map((line, index) => (
        <div key={index} className="text-center mb-10">
          <p className="text-2xl font-bold arabic-text rtl">{line.ar}</p>
          <p className="text-lg italic mt-2">{line.tx}</p>
          <p className={`${fontSizeClass()} mt-2`}>
            {line[selectedLanguage] || line.en}
          </p>
        </div>
      ))}
    </>
  );
}
