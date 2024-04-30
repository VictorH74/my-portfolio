import { SkillsCtx } from "@/contexts/SkillsContext";
import { useContext } from "react";

const useSkills = () => useContext(SkillsCtx)

export default useSkills