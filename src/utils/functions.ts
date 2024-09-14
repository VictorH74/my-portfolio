'use client';
import { db } from '@/configs/firebaseConfig';
import { ProfileContactsType } from '@/types';
import { doc, getDoc } from 'firebase/firestore';

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
