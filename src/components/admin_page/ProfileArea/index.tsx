import React from 'react';

import { Contacts } from './Contacts';
import { ProfileImageContainer } from './ProfileImageContainer';
import { ResumeCV } from './ResumeCV';
import { headingClassName } from '../components/CollectionActions';

export const ProfileArea = () => {
    return (
        <section>
            <h1 className={headingClassName}>Profile</h1>
            <div className="flex flex-row gap-2 max-md:flex-col">
                <div className="flex flex-col gap-2 w-[500px] max-md:w-full">
                    <ProfileImageContainer />
                    <ResumeCV />
                </div>
                <div className="w-full">
                    <Contacts />
                </div>
            </div>
        </section>
    );
};
