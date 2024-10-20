'use client';
import { ContactList } from '@/components/ContactList';
import { Divider } from '@/components/Divider';
import { useWindowSize } from '@/hooks/UseWindowsSize';
import { useTranslations } from 'next-intl';

import { Timer } from './Timer';
import { useFooter } from './useContacts';

export const Footer = () => {
    const hook = useFooter();
    const t = useTranslations('Contacts_Section');
    const [w] = useWindowSize();

    return (
        <div className="bg-[#00000035] text-center pb-10 m-0 mt-10 rounded-tl-3xl rounded-tr-3xl backdrop-blur-md">
            <section className="home-section min-h-[auto]" id="contacts">
                {w > 768 && <Timer />}
                <ContactList center />
            </section>
            <Divider className="my-0 mb-3" />
            <footer className="mt-4">
                {' '}
                <p className="text-custom-white">
                    &copy; {t('footer_paragraph')}
                </p>{' '}
            </footer>
            <div ref={hook.endOfPageRef} />
        </div>
    );
};
