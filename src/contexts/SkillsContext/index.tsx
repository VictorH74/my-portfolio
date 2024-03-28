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
  notSkills: boolean
}

export const SkillsCtx = React.createContext<CtxValue>({
  skillData: [],
  notSkills: false
});

const gistId = "ee56f0e7ddea13681b411f97b7f20fe5";

const SkillsProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [skillData, setData] = React.useState<TechIcons[]>([]);
  const [notSkills, setNotSkills] = React.useState(false)

  React.useEffect(() => {
    try {
      fetch(`https://api.github.com/gists/${gistId}`)
        .then((results) => {
          return results.json();
        })
        .then((data) => {
          if (!data.files) {
            setNotSkills(true)
            return;
          }
          const content = data.files["skills.json"].content;
          const skills = JSON.parse(content);
          setData(skills);
        });
    } catch (e) {
      console.log("Error-------------")
      console.log(e)
    }

  }, []);

  return (
    <SkillsCtx.Provider value={{ skillData, notSkills }}>{children}</SkillsCtx.Provider>
  );
};

export default SkillsProvider;
