'use client';

import { useState } from 'react';

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <select 
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-black/50 backdrop-blur-lg text-white px-4 py-2 rounded-lg border border-purple-500"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
