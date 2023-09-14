import { LanguageCtx } from "@/contexts/LanguageContext";
import { useContext } from "react";

const useLanguage = () => useContext(LanguageCtx)

export default useLanguage