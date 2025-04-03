'use client';
import { doc, getDoc } from 'firebase/firestore';
import { BRAZIL_PHONE_PATTERN, PROJECT_GRADIENT_COLORS } from './constants';
import { db } from '@/configs/firebaseConfig';
import { ProfileContactsType } from '@/types';

export const getProjectGradient = (projectIndex: number) => {
    const gradientColorsLength = PROJECT_GRADIENT_COLORS.length;
    const factor = Math.floor(projectIndex / gradientColorsLength);

    return projectIndex - gradientColorsLength * factor;
};

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

export const formatText = (text: string): string => {
    return text
        .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // Negrito
        .replace(/_(.*?)_/g, '<em>$1</em>'); // Itálico
};

export const isMobilePortrait = () => {
    if (typeof navigator === 'undefined' || typeof window === 'undefined')
        return false;

    const isMobileDevice =
        /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
            navigator.userAgent.toLowerCase()
        );
    const isSmallScreen = window.matchMedia('(max-width: 767px)').matches;
    return isMobileDevice && isSmallScreen;
};
