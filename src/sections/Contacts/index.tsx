'use client';
import ContactList from '@/components/ContactList';
import useContacts from './useContacts';
import { twMerge } from 'tailwind-merge';
import Timer from './Timer';

export default function Contacts() {
    const hook = useContacts();

    return (
        <div className="bg-[#00000035] text-center pb-10 m-0 mt-10 rounded-tl-3xl rounded-tr-3xl backdrop-blur-md">
            <section className="home-section min-h-[auto]" id="contacts">
                <div
                    className={twMerge(
                        'mt-12 mb-10 duration-300 select-none opacity-0 scale-50',
                        hook.reachedBottom && 'opacity-100 scale-100'
                    )}
                >
                    <h1 className="text-3xl text-[var(--theme-color)]">
                        THANKS FOR SCROLLING!
                    </h1>
                    <Timer reachedBottom={hook.reachedBottom} />
                </div>

                <div className="mt-4">
                    <ContactList center />
                </div>
            </section>
            <div className="h-[2px] mb-3 bg-[var(--theme-color)]" />
            <footer className="mt-4">
                {' '}
                <p className="text-custom-white">
                    &copy; {hook.translate.footerParagraph}
                </p>{' '}
            </footer>
            <div ref={hook.endOfPageRef} />
        </div>
    );
}
