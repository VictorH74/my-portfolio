import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { AboutMe } from '@/components/sections/AboutMe';
import { Presentation } from '@/components/sections/Presentation';
import { ProjectList } from '@/components/sections/ProjectList';
import { Technologies } from '@/components/sections/Technologies';
import { poppins400 } from '@/utils/fonts';
import { twMerge } from 'tailwind-merge';

export default function Home() {
    return (
        <div className={twMerge('min-h-screen', poppins400.className)}>
            <Navbar />
            <main className="overflow-x-hidden">
                <Presentation />
                <AboutMe />
                <Technologies />
                <ProjectList />
                <Footer />
            </main>
        </div>
    );
}
