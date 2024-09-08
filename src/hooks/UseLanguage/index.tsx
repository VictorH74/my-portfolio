/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Language } from '@/types';
import React from 'react';

const useLanguage = (): Language => {
    const [lang, setLang] = React.useState<Language>('en');
    const langs = ['en', 'pt-BR'];

    React.useEffect(() => {
        const userLang = window.navigator.language;
        if (langs.includes(userLang)) {
            setLang(userLang as Language);
        }
    }, []);

    return (langs.includes(lang) ? lang : 'en') as Language;
};

export default useLanguage;
