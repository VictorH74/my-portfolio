import React from "react"
import useLanguage from "@/hooks/UseLanguage"

type LanguageStr = { [key: string]: { [key: string]: any } }

/**
 * @param languageStr 
 * @returns 
 */
const useTranslate: (obj: LanguageStr) => (key: string, value?: any) => any = (languageStr) => {
    const { language: lang } = useLanguage()
    /**
     * 
     * @param key 
     * @param value
     * @returns 
     */
    const traslate = (key: string, value?: any) => {
        if (value) {
            return languageStr[lang as keyof typeof languageStr][key].replaceAll("[value]", String(value))
        }
        return languageStr[lang as keyof typeof languageStr][key]
    }

    return traslate;
}

export default useTranslate