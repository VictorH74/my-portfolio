import { TechnologiesCtx } from "@/contexts/TechnologiesContext";
import { useContext } from "react";

const useTechnologies = () => useContext(TechnologiesCtx)

export default useTechnologies