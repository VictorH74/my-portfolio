"use client";
import { TechIcons } from "@/types";
import { fetchTechnologies } from "@/utils/functions";
import React from "react";
import { useQuery } from "react-query";

interface CtxValue {
  skillData: Array<TechIcons>;
  notSkills: boolean
}

export const SkillsCtx = React.createContext<CtxValue>({
  skillData: [],
  notSkills: false
});

const SkillsProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  // const [skillData, setData] = React.useState<TechIcons[]>([]);
  const { data: skillData } = useQuery({
    queryKey: ["techs"],
    queryFn: () => fetchTechnologies(data => localStorage.setItem("techs", JSON.stringify(data)))
  })
  const [notSkills, setNotSkills] = React.useState(false)

  React.useEffect(() => {
    setNotSkills(!skillData)
  }, [skillData]);

  return (
    <SkillsCtx.Provider value={{ skillData: skillData || [], notSkills }}>{children}</SkillsCtx.Provider>
  );
};

export default SkillsProvider;
