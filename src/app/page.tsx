"use client";
import Header from "@/components/Header";
import TechnologiesProvider from "@/contexts/TechnologiesContext";
import AboutMe from "@/sections/AboutMe";
import Contacts from "@/sections/Contacts";
import Presentation from "@/sections/Presentation";
import Projects from "@/sections/Projects";
import Technologies from "@/sections/Technologies";
import Aos from "aos";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "aos/dist/aos.css";
import ContactMe from "@/sections/ContactMe";
import Experiences from "@/sections/Experiences";
import Loading from "@/components/Loading";
import { TranslationLang } from "@/types/language";
import SwitchColorTheme from "@/components/SwitchColorTheme";
import { ThemeProvider } from "@/contexts/ThemeColor";

const translations: TranslationLang = {
  "pt-BR": {
    message:
      "Algumas partes não estão adaptados para o tema CLARO. Mude o tema do seu navegador para ESCURO para melhor visibilidade",
  },
  en: {
    message:
      "Some parts are not adapted to the CLARO theme. Change your browser theme to DARK for better visibility",
  },
};

export default function Home() {
  const queryClient = new QueryClient();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Aos.init();
    setTimeout(() => setLoading(false), 500);
    const lightTheme = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    if (lightTheme) {
      const lang = window.navigator.language;
      const { message } =
        translations[
          (["en", "pt-BR"].includes(lang)
            ? lang
            : "en") as keyof typeof translations
        ];
      setTimeout(() => alert(message), 3000);
    }
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center w-screen h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TechnologiesProvider>
        <ThemeProvider>
          <>
            <Header />
            <main className="scroll-smooth blue-scrollbar">
              <Presentation />
              <AboutMe />
              <Technologies />
              <Experiences />
              <Projects />
              <ContactMe />
              <Contacts />
            </main>
            <SwitchColorTheme />
          </>
        </ThemeProvider>
      </TechnologiesProvider>
    </QueryClientProvider>
  );
}
