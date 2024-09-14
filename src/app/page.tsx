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
import Loading from '@/components/Loading';
// import SwitchThemeColorBtn from '@/components/SwitchThemeColorBtn';
// import useWindowSize from '@/hooks/UseWindowsSize';

export default function HomePage() {
    // const size = useWindowSize();
    const [initialLoading, setInitialLoading] = React.useState(true);

    React.useEffect(() => {
        Aos.init();
        setTimeout(() => setInitialLoading(false), 800);
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
            {initialLoading && (
                <div className="fixed inset-0 bg-[#ffffff] dark:bg-[#1d1d1d] grid place-items-center z-20">
                    <Loading />
                </div>
            )}
        </Providers>
    );
}
