'use client';
import ContactList from '@/components/ContactList';
import useContacts from './useContacts';
import Timer from './Timer';
import { useTranslations } from 'next-intl';
import useWindowSize from '@/hooks/UseWindowsSize';
import Divider from '@/components/Divider';

export default function Contacts() {
    const hook = useContacts();
    const t = useTranslations('Contacts_Section');
    const [w] = useWindowSize();

    return (
        <div className="bg-[#00000035] text-center pb-10 m-0 mt-10 rounded-tl-3xl rounded-tr-3xl backdrop-blur-md">
            <section className="home-section min-h-[auto]" id="contacts">
                {w > 768 && <Timer />}

                <div className="mt-4">
                    <ContactList center />
                </div>
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
}
