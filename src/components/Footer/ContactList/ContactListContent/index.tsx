/* eslint-disable @typescript-eslint/no-unused-vars */
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
                    <li
                        key={key}
                        className="animate-bounce"
                        style={{
                            animationDelay: i + '00ms',
                            animationDuration: '1s',
                        }}
                    >
                        <Link
                            target="_blank"
                            className="flex items-center gap-2"
                            href={contactHref[key](value)}
                            aria-label={contactArialLabel[key]}
                        >
                            <ContactIcon
                                className="text-custom-white"
                                sx={{
                                    fontSize: 25,
                                }}
                            />
                            <p className="max-[1100px]:hidden">
                                {contactItemDisplay[key](value)}
                            </p>
                        </Link>
                    </li>
                );
            })}
        </>
    );
};
