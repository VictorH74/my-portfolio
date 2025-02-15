import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useHeader } from './useHeader';
import { twMerge } from 'tailwind-merge';

const anchorLinks = [
    {
        href: '#welcome',
        label: 'Welcome',
    },
    {
        href: '#about-me',
        label: 'About Me',
    },
    {
        href: '#technologies',
        label: 'Technologies',
    },
    {
        href: '#projects',
        label: 'Projects',
    },
    {
        href: '#contacts',
        label: 'Contacts',
    },
];

export const Header = () => {
    const t = useTranslations('Header');
    const hook = useHeader();

    return (
        <div
            ref={hook.headerRef}
            className={twMerge(
                'w-full fixed py-5 text-center z-20 duration-300',
                hook.showHeader ? 'top-0' : '-top-full',
                hook.isInHeroSection
                    ? 'bg-transparent'
                    : 'bg-custom-black shadow-lg'
            )}
        >
            <div className="max-w-default w-full py-4 px-10 mx-auto justify-between flex items-center">
                <Image
                    src="/me-logo-v2.svg"
                    alt="logo"
                    width={50}
                    height={50}
                />
                <nav>
                    <ul className="text-[#a7b3c5] font-extrabold flex gap-3 duration-500">
                        {anchorLinks.map((anchor) => (
                            <li
                                key={anchor.href}
                                className="overflow-hidden h-[3rem] relative"
                            >
                                <Link
                                    href={anchor.href}
                                    className="grid hover:-translate-y-1/2 duration-500 p-3 space-y-5"
                                >
                                    <span>
                                        {t('nav_link_label_' + anchor.href)}
                                    </span>
                                    <span className="text-white">
                                        {t('nav_link_label_' + anchor.href)}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};
