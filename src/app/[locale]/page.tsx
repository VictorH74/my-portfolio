import { Footer } from '@/ui/home_page/Footer';
import { Header } from '@/ui/home_page/Header';
import { AboutMe } from '@/ui/home_page/sections/AboutMe';
import { Hero } from '@/ui/home_page/sections/Hero';
import { ProjectList } from '@/ui/home_page/sections/ProjectList';
import { TechnologyList } from '@/ui/home_page/sections/TechnologyList';
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
