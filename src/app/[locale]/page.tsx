'use client';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { AboutMe } from '@/components/sections/AboutMe';
import { Presentation } from '@/components/sections/Presentation';
import { ProjectList } from '@/components/sections/ProjectList';
import { TechnologyList } from '@/components/sections/TechnologyList';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { poppins400 } from '@/utils/fonts';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Home() {
    React.useEffect(() => {
        Aos.init();
    }, []);

    return (
        <div className={twMerge('min-h-screen', poppins400.className)}>
            <Header />
            <main>
                <Presentation />
                <AboutMe />
                <TechnologyList />
                <ProjectList />
                <Footer />
            </main>
        </div>
    );
}
