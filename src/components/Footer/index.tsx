'use client';
import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';
import { ContactList } from './ContactList';
import { ContactMe } from './ContactMe';

export const Footer = () => {
    const t = useTranslations('Footer');

    return (
        <footer className="bg-primary-black py-28 px-4  text-center max-h-fit">
            <div className="max-w-default w-full mx-auto size-fit grid place-items-center gap-11 text-[#D2D2D3]">
                <ContactMe />

                <Image
                    data-aos="zoom-in"
                    width={85}
                    height={85}
                    src="me-logo-v2.svg"
                    alt="logo"
                />

                <hr className="w-full h-[0.188] bg-white" />

                <ContactList />

                <div className="text-sm font-semibold flex gap-2">
                    <p>
                        &copy; {t('last_paragraph_part_1')}{' '}
                        <span className="animate-pulse">🤍</span>{' '}
                        {t('last_paragraph_part_2')}
                    </p>

                    <div className="grid place-items-center">
                        <div className="size-[0.375rem] bg-[#D2D2D3] rounded-full" />
                    </div>
                    <p>2025</p>
                </div>
            </div>
        </footer>
    );
};
