import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { ContactListContent } from './ContactListContent';
import { getContacts } from '@/utils/functions';

export const ContactList = () => {
    return (
        <ul className={twMerge('flex flex-row gap-9')}>
            <React.Suspense fallback={<Fallback />}>
                <ContactListContent promise={getContacts()} />
            </React.Suspense>
        </ul>
    );
};

const Fallback = () =>
    Array(4)
        .fill(null)
        .map((_, i) => (
            <Skeleton
                key={i}
                height={35}
                width={35}
                variant="circular"
                sx={{ backgroundColor: '#ececec' }}
            />
        ));
