'use client';
import ContactLinks from '@/components/LinkList';
import useContacts from './useContacts';

export default function Contacts() {
    const hook = useContacts();

    return (
        <div className="bg-[#00000035] text-center pb-10 m-0 mt-10 rounded-tl-3xl rounded-tr-3xl backdrop-blur-md">
            <section className="min-h-[auto]" id="contacts">
                <div
                    className={`mt-12 mb-10 duration-300 select-none ${
                        hook.reachedBottom
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-50'
                    }`}
                >
                    <h1 className="text-3xl text-[var(--theme-color)]">
                        THANKS FOR SCROLLING!
                    </h1>
                    <p className="mt-7 text-custom-white">
                        {hook.translate.time}: {hook.formatTime()}
                    </p>
                </div>

                <div className="mt-4">
                    <ContactLinks center />
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
