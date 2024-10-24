'use client';
import { db } from '@/configs/firebaseConfig';
import { ProfileContactsType } from '@/types';
import { doc, getDoc } from 'firebase/firestore';

import { BRAZIL_PHONE_PATTERN } from './constants';

export const getContacts = async () => {
    try {
        const docRef = doc(db, 'profile', 'contacts');
        const contacts = (await getDoc(docRef)).data() as ProfileContactsType;
        return contacts;
    } catch (err) {
        alert('error trying fetching contacts!');
        console.error(err);
    }
};

export const formatContactNumber = (number: string) => {
    if (new RegExp(BRAZIL_PHONE_PATTERN).test(number)) {
        const country_code = number.slice(0, 2);
        const ddd = number.slice(2, 4);
        const part_1 = number.slice(4, 9);
        const part_2 = number.slice(9);
        return `+${country_code} (${ddd}) ${part_1}-${part_2}`;
    }
    return number;
};

export const isDarkMode = () => {
    return (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );
};
