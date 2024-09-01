import { TechnologiesCtx } from "@/contexts/TechnologiesContext";
import { use } from "react";

const useTechnologies = () => {
    const ctx = use(TechnologiesCtx)
    if (!ctx) throw new Error('useTechnologies must be into a TechnologiesProvider')
        return ctx
}

export default useTechnologies