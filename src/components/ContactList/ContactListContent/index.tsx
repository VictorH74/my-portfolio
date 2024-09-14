import { ProfileContactsType } from '@/types';
import { contactIcon } from '@/utils/constants';
import Link from 'next/link';
import React from 'react';

const contactHref: Record<
    keyof ProfileContactsType,
    (_contactValue: string) => string
> = {
    email: (email) => `mailto:${email}`,
    github_url: (url) => url,
    linkedin_url: (url) => url,
    phone: (phone) => `https://wa.me/${phone}`,
};

const contactArialLabel: Record<keyof ProfileContactsType, string> = {
    email: 'link to owner email',
    github_url: 'link to owner github profile',
    linkedin_url: 'link to owner linkedin profile',
    phone: 'link to owner whatsapp chat',
};

interface ContactListContentProps {
    promise: Promise<ProfileContactsType | undefined>;
}

export default function ContactListContent(props: ContactListContentProps) {
    const contacts = React.use(props.promise);

    if (!contacts)
        return (
            <li>
                <p>No contacts</p>
            </li>
        );

    return (
        <>
            {Object.entries(contacts).map(([k, value], i) => {
                const key = k as keyof ProfileContactsType;
                const ContactIcon = contactIcon[key];

                return (
                    <li key={key}>
                        <Link
                            target="_blank"
                            className="hover:brightness-125 duration-200 animate-contacts-bounce"
                            style={{ animationDelay: i + '00ms' }}
                            href={contactHref[key](value)}
                            aria-label={contactArialLabel[key]}
                        >
                            <ContactIcon
                                className="primary-font-color"
                                sx={{
                                    fontSize: 35,
                                }}
                            />
                        </Link>
                    </li>
                );
            })}
        </>
    );
}
