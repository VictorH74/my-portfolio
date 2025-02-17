import { useTranslations } from 'next-intl';
import { useHamburger } from './useHamburger';
import { twMerge } from 'tailwind-merge';

export const Hamburger = () => {
    const t = useTranslations('Header');

    const hook = useHamburger();

    return (
        <div id="hamburger" className="min-lg:hidden">
            <div
                className="cursor-pointer h-7 w-8 grid gap-[0.438rem]"
                onClick={hook.toggle}
            >
                {/* TODO: improve className */}
                {Array(3)
                    .fill(undefined)
                    .map((_, i) => (
                        <span
                            key={i}
                            className={twMerge(
                                'h-[0.188rem] w-full rounded-xl bg-white',
                                [0, 2].includes(i)
                                    ? "origin-left duration-300'"
                                    : 'duration-150'
                            )}
                        ></span>
                    ))}
            </div>
            <div className="fixed top-24 -right-5 pointer-events-none">
                <ul className="nav-ul"></ul>
            </div>
        </div>
    );
};
