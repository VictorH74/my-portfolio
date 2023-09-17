"use client";
import { Language } from "@/types/language";
import React from "react";

const useLanguage = (): Language => {
  const [lang, setLang] = React.useState<Language>("en");
  const langs = ["en", "pt-BR"];

  React.useEffect(() => {
    const userLang = window.navigator.language;
    if (langs.includes(userLang)) {
      setLang(userLang as Language);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (langs.includes(lang) ? lang : "en") as Language;
};

export default useLanguage;
