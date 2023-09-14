import React, { createContext, useState, useEffect } from "react";

interface TechIcons {
  id: string;
  name: string;
  src: string;
  hidden?: boolean;
}

interface CtxValue {
  technologieData: Array<TechIcons>;
}

export const TechnologiesCtx = createContext<CtxValue>({
  technologieData: [],
});

const gistId = "ee56f0e7ddea13681b411f97b7f20fe5";

const TechnologiesProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [technologieData, setData] = useState<TechIcons[]>([]);

  useEffect(() => {
    fetch(`https://api.github.com/gists/${gistId}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        const content = data.files["technologies.json"].content;
        const technologies = JSON.parse(content);
        setData(technologies);
      });
  }, []);

  return (
    <TechnologiesCtx.Provider value={{ technologieData }}>
      {children}
    </TechnologiesCtx.Provider>
  );
};

export default TechnologiesProvider;
