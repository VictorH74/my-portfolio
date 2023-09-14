import React from "react";

interface AppContextInterface {
    darkTheme: boolean;
    setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
    children: JSX.Element;
}

export const ThemeContext = React.createContext<AppContextInterface | null>(null);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
    const [darkTheme, setTheme] = React.useState(true);

    const values: AppContextInterface = {
        darkTheme,
        setTheme
    }

    return <ThemeContext.Provider value={values} >{children}</ThemeContext.Provider>
}