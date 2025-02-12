// 'use client';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { AboutMe } from '@/components/sections/AboutMe';
import { Presentation } from '@/components/sections/Presentation';
import { ProjectList } from '@/components/sections/ProjectList';
import { Technologies } from '@/components/sections/Technologies';
// import Aos from 'aos';
import { poppins400 } from '@/utils/fonts';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Home() {
    // React.useEffect(() => {
    //     Aos.init();
    // }, []);

    return (
        <div className={twMerge('min-h-screen', poppins400.className)}>
            <Navbar />
            <main>
                <Presentation />
                <AboutMe />
                <Technologies />
                <ProjectList />
                <Footer />
            </main>
        </div>
    );
}
