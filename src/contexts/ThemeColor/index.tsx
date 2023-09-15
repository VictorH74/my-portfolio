import { THEME_COLOR_KEY } from "@/utils/constants";
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

  const setThemeColor = (color: string) => {
    localStorage.setItem(THEME_COLOR_KEY, color)
    setThemeColorState(color);
  };

  const values: AppContextInterface = {
    themeColor,
    setThemeColor,
  };

  React.useEffect(() => {
    const recoveredColor = localStorage.getItem(THEME_COLOR_KEY);
    if (recoveredColor === null) return;

    setThemeColorState(recoveredColor);
  }, []);

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
