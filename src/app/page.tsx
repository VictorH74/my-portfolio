'use client';
import Header from '@/components/Header';
import AboutMe from '@/sections/AboutMe';
import Contacts from '@/sections/Contacts';
import Presentation from '@/sections/Presentation';
import Projects from '@/sections/Projects';
import Skills from '@/sections/Technologies';
import Aos from 'aos';
import React from 'react';
import ContactMe from '@/sections/ContactMe';
import 'aos/dist/aos.css';
import Providers from '@/components/Providers';
// import SwitchThemeColorBtn from '@/components/SwitchThemeColorBtn';
// import useWindowSize from '@/hooks/UseWindowsSize';

export default function HomePage() {
    // const size = useWindowSize();

    React.useEffect(() => {
        Aos.init();
    }, []);

    return (
        <Providers>
            <div id="bg-animation" />
            <Header />
            <main className="scroll-smooth blue-scrollbar relative">
                <Presentation />
                <AboutMe />
                <Skills />
                <Projects />
                <ContactMe />
                <Contacts />
            </main>
            {/* {size[0] <= 1100 && <SwitchThemeColorBtn vertical />} */}
        </Providers>
    );
}
