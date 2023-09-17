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
import SwitchColorTheme from "@/components/SwitchColorTheme";
import { ThemeProvider } from "@/contexts/ThemeColor";

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
