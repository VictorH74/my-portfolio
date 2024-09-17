import Image from 'next/image';
import { headingClassName } from '../CollectionActions';
import ResumeCV from './ResumeCV';
import Me from '@/assets/me.webp';
import React from 'react';
import Contacts from './Contacts';

export default function ProfileArea() {
    return (
        <section>
            <h1 className={headingClassName}>Profile</h1>
            <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-[500px]">
                    <div>
                        <Image
                            loading="lazy"
                            placeholder="empty"
                            className="
              rounded-md
              object-cover 
              max-md:max-w-[300px]
              h-auto
              w-full
              duration-200
              bg-[var(--theme-color)]
            "
                            width={300}
                            src={Me}
                            alt="me"
                        />
                    </div>
                    <ResumeCV />
                </div>
                <div className="w-full">
                    <Contacts />
                </div>
            </div>
        </section>
    );
}
