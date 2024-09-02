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
import Loading from '@/components/Loading';
import 'aos/dist/aos.css';
import Providers from '@/components/Providers';

export default function HomePage() {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        Aos.init();
        setTimeout(() => setLoading(false), 500);
    }, []);

    return (
        <Providers>
            {loading ? (
                <div className="grid place-items-center w-screen h-screen">
                    <Loading />
                </div>
            ) : (
                <>
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
                </>
            )}
        </Providers>
    );
}
