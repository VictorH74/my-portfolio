import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import { getContacts } from '@/utils/functions';
import ContactListContent from './ContactListContent';
import { twMerge } from 'tailwind-merge';

interface Props {
    center?: boolean;
}

export default React.memo(function ContactList(props: Props) {
    return (
        <ul
            className={twMerge(
                'flex flex-row gap-5',
                props.center && 'justify-center'
            )}
        >
            <React.Suspense fallback={<Fallback />}>
                <ContactListContent promise={getContacts()} />
            </React.Suspense>
        </ul>
    );
});

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
