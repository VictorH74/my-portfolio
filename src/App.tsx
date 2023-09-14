import { GlobalStyles } from "./styles/global";
import Header from "./components/Header";
import Presentation from "./sections/Presentation";
import AboutMe from "./sections/AboutMe";
// import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contacts from "./sections/Contacts";
import Technologies from "./sections/Technologies";
import { ThemeProvider } from "styled-components";
import React from "react";
import { defaultTheme } from "./styles/theme";
import { AnimatedBackground } from "./components/AnimatedBackground";
import aos from "aos";
import { LanguageProvider } from "./contexts/LanguageContext";
import TechnologiesProvider from "./contexts/TechnologiesContext";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const [themeVariant, setTheme] = React.useState(2);
  const queryClient = new QueryClient();

  React.useEffect(() => {
    aos.init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <TechnologiesProvider>
          <LanguageProvider>
            <>
              <Header />
              <Presentation />
              <AboutMe />
              <Technologies />
              <Projects />
              <Contacts />
              {/* <AnimatedBackground circleAmount={10} /> */}
            </>
          </LanguageProvider>
        </TechnologiesProvider>
        <GlobalStyles variant={themeVariant} />
      </ThemeProvider>
    </QueryClientProvider>

  );
}

export default App;
