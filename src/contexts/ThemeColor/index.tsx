import React from "react";

interface AppContextInterface {
  themeColor: string;
  setThemeColor: (e: string) => void;
}

interface Props {
  children: JSX.Element;
}

export const ThemeContext = React.createContext<AppContextInterface>({
  themeColor: "",
  setThemeColor: () => {},
});

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [themeColor, setThemeColorState] = React.useState("#4e54fd");

  const setThemeColor = (color: string) => setThemeColorState(color);

  const values: AppContextInterface = {
    themeColor,
    setThemeColor,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
