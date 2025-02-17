import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { anchorLinks, useHeader } from './useHeader';
import { twMerge } from 'tailwind-merge';
import { Hamburger } from './Hamburger';

export const Header = () => {
    const t = useTranslations('Header');
    const hook = useHeader();

    return (
        <div
            ref={hook.headerRef}
            className={twMerge(
                'w-full fixed py-10 min-[75rem]:py-4 min-[121rem]:py-10 text-center z-50 duration-300',
                hook.showHeader ? 'top-0' : '-top-full',
                hook.isInHeroSection
                    ? 'bg-primary-black/55 backdrop-blur-md'
                    : 'bg-primary-black shadow-lg'
            )}
        >
            <div className="max-w-default w-full px-10 mx-auto justify-between flex items-center">
                <Image
                    src="/me-logo-v2.svg"
                    alt="logo"
                    width={50}
                    height={50}
                />
                <nav className="max-lg:hidden">
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
                <Hamburger />
            </div>
        </div>
    );
};
