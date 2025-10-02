import { db } from '@/lib/firebase/client';
import { ProfileContactsType } from '@/types/generic';
import { contactIcon } from '@/utils/constants';
import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';

export const inputType: Record<
    keyof ProfileContactsType,
    React.InputHTMLAttributes<HTMLInputElement>['type']
> = {
    email: 'email',
    github_url: 'url',
    linkedin_url: 'url',
    phone: 'text',
};

export interface UpdateContactModalProps {
    contactKey: keyof ProfileContactsType;
    contactValue: string;
    onSubmitted(_contactProp: Record<string, string>): void;
    onClose(): void;
}

export const useUpdateContactModal = (props: UpdateContactModalProps) => {
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const Icon = React.useMemo(
        () => contactIcon[props.contactKey as keyof typeof contactIcon],
        [props.contactKey]
    );

    React.useEffect(() => {
        setInputValue(props.contactValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const contactProp = {
                [props.contactKey]: inputValue,
            };
            const docRef = doc(db, 'profile', 'contacts');
            console.log(contactProp);
            await updateDoc(docRef, contactProp);
            props.onSubmitted(contactProp);
            props.onClose();
        } catch (err) {
            alert('Error trying update contact');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        inputValue,
        setInputValue,
        isLoading,
        Icon,
        handleSubmit,
    };
};
