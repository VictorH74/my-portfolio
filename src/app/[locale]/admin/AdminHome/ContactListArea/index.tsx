import { headingClassName } from '../CollectionActions';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/configs/firebaseConfig';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import { IconButton } from '@/components/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ModalContainer from '@/components/ModalContainer';
import CloseIcon from '@mui/icons-material/Close';
import { BRAZIL_PHONE_PATTERN, contactIcon } from '@/utils/constants';
import { getContacts } from '@/utils/functions';
import { ProfileContactsType } from '@/types';

const inputType: Record<
    keyof ProfileContactsType,
    React.InputHTMLAttributes<HTMLInputElement>['type']
> = {
    email: 'email',
    github_url: 'url',
    linkedin_url: 'url',
    phone: 'text',
};

export default function ContactListArea() {
    const [toUpdateContact, setToUpdateContact] = React.useState<
        [keyof ProfileContactsType, string] | null
    >(null);
    const [contacts, setContacts] = React.useState<ProfileContactsType | null>(
        null
    );

    React.useEffect(() => {
        (async () => {
            const contacts = await getContacts();
            if (!contacts) return;
            setContacts(contacts);
        })();
    }, []);

    const makeSelectContact =
        (key: keyof ProfileContactsType, value: string) => () => {
            setToUpdateContact([key, value]);
        };

    return (
        <section>
            <h1 className={headingClassName}>Contact List</h1>

            {!!contacts ? (
                <ul className="grid grid-cols-4 max-lg:grid-cols-1 max-xl:grid-cols-2 gap-2">
                    {Object.entries(contacts).map(([key, value]) => {
                        const Icon =
                            contactIcon[key as keyof typeof contactIcon];
                        return (
                            <li
                                key={key}
                                className="p-2 bg-custom-gray-light w-full rounded-md text-center relative truncate
                                "
                            >
                                <Icon sx={{ width: 35, height: 35 }} /> {value}
                                <div className="absolute inset-0 bg-black/50 duration-200 opacity-0 hover:opacity-100 flex gap-2 items-center justify-center">
                                    <IconButton
                                        Icon={EditIcon}
                                        onClick={makeSelectContact(
                                            key as keyof ProfileContactsType,
                                            value
                                        )}
                                        type="button"
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <ul className="grid grid-cols-4 max-lg:grid-cols-1 max-xl:grid-cols-2 gap-2 mb-6">
                    {Array(4)
                        .fill(null)
                        .map((_, i) => (
                            <li
                                key={i}
                                className="h-fit overflow-hidden rounded-md"
                            >
                                <Skeleton
                                    sx={{
                                        backgroundColor: '#5a5a5a',
                                    }}
                                    height={50}
                                    variant="rectangular"
                                    animation="wave"
                                />
                            </li>
                        ))}
                </ul>
            )}

            {!!toUpdateContact && (
                <UpdateContactModal
                    contactKey={toUpdateContact[0]}
                    contactValue={toUpdateContact[1]}
                    onSubmitted={(prop) => {
                        setContacts(
                            (prev) =>
                                Object.assign(
                                    prev!,
                                    prop
                                ) as ProfileContactsType
                        );
                    }}
                    onClose={() => setToUpdateContact(null)}
                />
            )}
        </section>
    );
}

const UpdateContactModal: React.FC<{
    contactKey: keyof ProfileContactsType;
    contactValue: string;
    onSubmitted(_contactProp: Record<string, string>): void;
    onClose(): void;
}> = (props) => {
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

    return (
        <ModalContainer>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[500px] bg-gray-200 dark:bg-[#3f3f3f] rounded-md px-2 pb-3 animate-scale"
            >
                <div className="text-right py-2">
                    <button
                        disabled={isLoading}
                        onClick={props.onClose}
                        type="button"
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div className="flex flex-row w-full">
                    <Icon sx={{ width: 50, height: 50 }} />
                    <input
                        type={inputType[props.contactKey]}
                        {...(props.contactKey == 'phone' && {
                            pattern: BRAZIL_PHONE_PATTERN,
                            title: 'Must be only digits',
                        })}
                        className="w-full p-2 border-2 border-custom-white rounded-md ml-2"
                        value={inputValue}
                        required
                        onChange={(e) => setInputValue(e.currentTarget.value)}
                    />
                </div>

                <button
                    disabled={isLoading}
                    className="p-2 bg-[var(--theme-color)] w-full mt-2 rounded-md"
                >
                    {isLoading ? 'Updating...' : 'Update'}
                </button>
            </form>
        </ModalContainer>
    );
};
