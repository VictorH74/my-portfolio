import { IconButton } from '@/components/IconButton';
import { ProfileContactsType } from '@/types';
import { BRAZIL_PHONE_PATTERN, contactIcon } from '@/utils/constants';
import { getContacts } from '@/utils/functions';
import EditIcon from '@mui/icons-material/Edit';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';

import { UpdateContactModal } from './UpdateContactModal';

export const Contacts = () => {
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

    const formatNumber = (number: string) => {
        if (new RegExp(BRAZIL_PHONE_PATTERN).test(number)) {
            const country_code = number.slice(0, 2);
            const ddd = number.slice(2, 4);
            const part_1 = number.slice(4, 9);
            const part_2 = number.slice(9);
            return `+${country_code} (${ddd}) ${part_1}-${part_2}`;
        }
        return number;
    };

    return (
        <ul className="flex flex-col border border-custom-gray-light dark:border-gray-400 divide-y divide-custom-gray-light dark:divide-gray-400 rounded-md">
            {!!contacts
                ? Object.entries(contacts).map(([key, value]) => {
                      const Icon = contactIcon[key as keyof typeof contactIcon];
                      return (
                          <li
                              key={key}
                              className="p-2 w-full flex flex-row gap-2 items-center
                                "
                          >
                              <Icon sx={{ width: 35, height: 35 }} />
                              <p className="truncate grow">
                                  {key == 'phone' ? formatNumber(value) : value}
                              </p>
                              <IconButton
                                  Icon={EditIcon}
                                  onClick={makeSelectContact(
                                      key as keyof ProfileContactsType,
                                      value
                                  )}
                                  type="button"
                              />
                          </li>
                      );
                  })
                : Array(4)
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
        </ul>
    );
};
