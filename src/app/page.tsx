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
import { twMerge } from 'tailwind-merge';

export default function HomePage() {
    const [initialLoading, setInitialLoading] = React.useState(true);

    React.useEffect(() => {
        Aos.init();
        setTimeout(() => setInitialLoading(false), 1000);
    }, []);

    return (
        <Providers>
            <div id="bg-animation" />
            <Header isLoading={initialLoading} />
            <main
                className={twMerge(
                    'scroll-smooth blue-scrollbar relative duration-200',
                    initialLoading && 'opacity-0'
                )}
            >
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
