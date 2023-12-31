"use client";
import Header from "@/components/Header";
import SkillsProvider from "@/contexts/SkillsContext";
import AboutMe from "@/sections/AboutMe";
import Contacts from "@/sections/Contacts";
import Presentation from "@/sections/Presentation";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Aos from "aos";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ContactMe from "@/sections/ContactMe";
import Experiences from "@/sections/Experiences";
import Loading from "@/components/Loading";
import SwitchThemeColorBtn from "@/components/SwitchThemeColorBtn";
import { ThemeProvider } from "@/contexts/ThemeColor";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "aos/dist/aos.css";

export default function Home() {
  const queryClient = new QueryClient();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Aos.init();
    setTimeout(() => setLoading(false), 500);
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
      <SkillsProvider>
        <ThemeProvider>
          <>
            <Header />
            <main className="scroll-smooth blue-scrollbar">
              <Presentation />
              <AboutMe />
              <Skills />
              <Experiences />
              <Projects />
              <ContactMe />
              <Contacts />
            </main>
            <SwitchThemeColorBtn />
          </>
        </ThemeProvider>
      </SkillsProvider>
    </QueryClientProvider>
  );
}
