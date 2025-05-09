/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { MuiIconType, ProfileContactsType } from '@/types';
import { formatContactNumber, getContacts } from '@/utils/functions';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';

const contactIcon: Record<keyof ProfileContactsType, MuiIconType> = {
    email: EmailIcon,
    github_url: GitHubIcon,
    linkedin_url: LinkedInIcon,
    phone: WhatsAppIcon,
};

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

const contactItemDisplay: Record<
    keyof ProfileContactsType,
    (_: string) => string
> = {
    email: (email: string) => email,
    github_url: (_: string) => 'VictorH74',
    linkedin_url: (_: string) => 'Victor Leal',
    phone: (num: string) => formatContactNumber(num),
};

export const ContactList = () => {
    const {
        data: contacts,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['contact-list'],
        queryFn: getContacts,
    });

    if (isError)
        return (
            <button
                className="py-2 px-6 text-red-400 font-medium"
                onClick={async () => await refetch()} // TODO; test refetch
            >
                Error Trying Loading contacts!. Retry
            </button>
        );

    if (isLoading)
        return (
            <ul className={twMerge('flex flex-row gap-9')}>
                {Array(4)
                    .fill(null)
                    .map((_, i) => (
                        <Skeleton
                            key={i}
                            height={35}
                            width={35}
                            variant="circular"
                            sx={{ backgroundColor: '#ececec' }}
                        />
                    ))}
            </ul>
        );

    if (!contacts) return <p>No contacts</p>;

    return (
        <ul className={twMerge('flex flex-row gap-9')}>
            {Object.entries(contacts).map(([k, value], i) => {
                const key = k as keyof ProfileContactsType;
                const ContactIcon = contactIcon[key];

                return (
                    <li key={key}>
                        <Link
                            target="_blank"
                            className="flex items-center gap-2"
                            href={contactHref[key](value)}
                            aria-label={contactArialLabel[key]}
                        >
                            <ContactIcon
                                className="text-background"
                                sx={{
                                    fontSize: 25,
                                }}
                            />
                            <p className="max-[68.75rem]:hidden">
                                {contactItemDisplay[key](value)}
                            </p>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};
