import { Footer } from '@/components/home_page/Footer';
import { Header } from '@/components/home_page/Header';
import { AboutMe } from '@/components/home_page/sections/AboutMe';
import { Hero } from '@/components/home_page/sections/Hero';
import { ProjectList } from '@/components/home_page/sections/ProjectList';
import { Services } from '@/components/home_page/sections/Services';
import { TechnologyList } from '@/components/home_page/sections/TechnologyList';
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
                <Services />
                <TechnologyList />
                <ProjectList />
                <Footer />
            </main>
        </div>
    );
}
