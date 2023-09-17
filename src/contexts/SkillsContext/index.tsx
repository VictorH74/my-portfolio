"use client";
import React from "react";

interface TechIcons {
  id: string;
  name: string;
  src: string;
  hidden?: boolean;
}

interface CtxValue {
  skillData: Array<TechIcons>;
}

export const SkillsCtx = React.createContext<CtxValue>({
  skillData: [],
});

const gistId = "ee56f0e7ddea13681b411f97b7f20fe5";

const SkillsProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [skillData, setData] = React.useState<TechIcons[]>([]);

  React.useEffect(() => {
    fetch(`https://api.github.com/gists/${gistId}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        const content = data.files["skills.json"].content;
        const skills = JSON.parse(content);
        setData(skills);
      });
  }, []);

  return (
    <SkillsCtx.Provider value={{ skillData }}>{children}</SkillsCtx.Provider>
  );
};

export default SkillsProvider;
