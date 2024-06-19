'use client'

import { FaUser, FaGlobe, FaCog, FaSearch, FaTimes } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import {useLanguage} from "@/app/LanguageProvider";
import {useUserPref} from "@/components/UserPrefProvider";

const Header = () => {
    const { setSelectedLanguage, translationFontSize, setTranslationFontSize } = useUserPref();
    const [showPopup, setShowPopup] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);

    const popupRef = useRef(null);
    const drawerRef = useRef(null);

    const handleLanguageChange = (lang) => {
        setSelectedLanguage(lang);
        setShowPopup(false);
    };

    const handleFontSizeChange = (size) => {
        setTranslationFontSize(size);
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowPopup(false);
        }
        if (drawerRef.current && !drawerRef.current.contains(event.target)) {
            setShowDrawer(false);
        }
    };

    const increaseFontSize = () => {
        if (translationFontSize < 6) {
            handleFontSizeChange(translationFontSize + 1);
        }
    };

    const decreaseFontSize = () => {
        if (translationFontSize > 1) {
            handleFontSizeChange(translationFontSize - 1);
        }
    };

    useEffect(() => {
        if (showPopup || showDrawer) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup, showDrawer]);

    return (
        <header className="flex justify-between items-center w-full p-4 bg-gray-800 text-white border-b border-gray-700 relative">
            <div className="text-2xl font-bold">Shia Duas</div>
            <div className="flex gap-4">
                <FaUser className="text-xl cursor-pointer" />
                <FaGlobe className="text-xl cursor-pointer" onClick={() => setShowPopup(!showPopup)} />
                <FaCog className="text-xl cursor-pointer" onClick={() => setShowDrawer(!showDrawer)} />
                <FaSearch className="text-xl cursor-pointer" />
            </div>
            {showPopup && (
                <div ref={popupRef} className="absolute top-12 right-4 bg-white text-black p-4 shadow-lg rounded">
                    <div onClick={() => handleLanguageChange('en')} className="cursor-pointer">English</div>
                    <div onClick={() => handleLanguageChange('de')} className="cursor-pointer">Deutsch</div>
                    <div onClick={() => handleLanguageChange('es')} className="cursor-pointer">Español</div>
                    <div onClick={() => handleLanguageChange('fr')} className="cursor-pointer">Français</div>
                    <div onClick={() => handleLanguageChange('tr')} className="cursor-pointer">Türkçe</div>
                </div>
            )}
            {showDrawer && (
                <div ref={drawerRef} className="fixed top-0 right-0 h-full w-64 bg-gray-800 text-white p-4 shadow-lg z-50">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Settings</h2>
                        <FaTimes className="text-xl cursor-pointer" onClick={() => setShowDrawer(false)} />
                    </div>
                    {/* Drawer content */}
                    <div>
                        <h3 className="text-lg font-bold">Translation</h3>
                        <div className="mt-2">
                            <label className="block mb-2">Font Size:</label>
                            <div className="flex items-center">
                                <button
                                    onClick={decreaseFontSize}
                                    className="bg-gray-700 text-white px-2 py-1 rounded-l"
                                    disabled={translationFontSize <= 1}
                                >
                                    -
                                </button>
                                <span className="px-4">{translationFontSize}</span>
                                <button
                                    onClick={increaseFontSize}
                                    className="bg-gray-700 text-white px-2 py-1 rounded-r"
                                    disabled={translationFontSize >= 6}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
        
    );
};

export default Header;