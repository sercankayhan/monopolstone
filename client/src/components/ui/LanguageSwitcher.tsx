import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  compact?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: 'en' | 'tr') => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('i18nextLng', lng);
    } catch {}
  };

  const isTR = i18n.resolvedLanguage?.startsWith('tr');

  if (compact) {
    return (
      <button
        onClick={() => changeLanguage(isTR ? 'en' : 'tr')}
        className="px-3 py-1 text-sm rounded-md border border-gray-200 hover:bg-gray-50"
      >
        {isTR ? 'TR' : 'EN'}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage('tr')}
        className={`px-3 py-1 text-sm rounded-md border ${isTR ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:bg-gray-50'}`}
      >
        Türkçe
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 text-sm rounded-md border ${!isTR ? 'bg-primary text-white border-primary' : 'border-gray-200 hover:bg-gray-50'}`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;








