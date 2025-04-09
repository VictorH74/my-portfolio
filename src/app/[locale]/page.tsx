import { Footer } from '@/ui/Footer';
import { Header } from '@/ui/Header';
import { AboutMe } from '@/ui/sections/AboutMe';
import { Hero } from '@/ui/sections/Hero';
import { ProjectList } from '@/ui/sections/ProjectList';
import { TechnologyList } from '@/ui/sections/TechnologyList';
import 'aos/dist/aos.css';
import { poppins400 } from '@/utils/fonts';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Home() {
    return (
        <div className={twMerge('min-h-screen', poppins400.className)}>
            <Header />
            <main>
                <Hero />
                <AboutMe />
                <TechnologyList />
                <ProjectList />
                <Footer />
            </main>
        </div>
    );
}
