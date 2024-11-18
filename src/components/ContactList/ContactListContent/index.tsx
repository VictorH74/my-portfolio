import { ProfileContactsType } from '@/types';
import { contactIcon } from '@/utils/constants';
import { formatContactNumber } from '@/utils/functions';
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

const contactItemDisplay: Record<
    keyof ProfileContactsType,
    (_: string) => string
> = {
    email: (email: string) => email,
    github_url: (_: string) => 'VictorH74',
    linkedin_url: (_: string) => 'Victor Leal',
    phone: (num: string) => formatContactNumber(num),
};

export const ContactListContent = (props: ContactListContentProps) => {
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
                            className="hover:brightness-125 duration-200 animate-contacts-bounce flex flex-row gap-2 py-2 px-4 w-full bg-custom-gray-dark rounded-full justify-center items-center text-sm"
                            style={{ animationDelay: i + '00ms' }}
                            href={contactHref[key](value)}
                            aria-label={contactArialLabel[key]}
                        >
                            <ContactIcon
                                className="text-custom-white"
                                sx={{
                                    fontSize: 25,
                                }}
                            />
                            {contactItemDisplay[key](value)}
                        </Link>
                    </li>
                );
            })}
        </>
    );
};
