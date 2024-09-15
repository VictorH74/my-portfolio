import { headingClassName } from '../CollectionActions';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import { IconButton } from '@/components/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { contactIcon } from '@/utils/constants';
import { getContacts } from '@/utils/functions';
import { ProfileContactsType } from '@/types';
import UpdateContactModal from './UpdateContactModal';

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
