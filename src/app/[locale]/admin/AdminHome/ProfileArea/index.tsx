import { headingClassName } from '../CollectionActions';
import ResumeCV from './ResumeCV';
import React from 'react';
import Contacts from './Contacts';
import ProfileImage from './ProfileImage';

export default function ProfileArea() {
    return (
        <section>
            <h1 className={headingClassName}>Profile</h1>
            <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-[500px]">
                    <ProfileImage />
                    <ResumeCV />
                </div>
                <div className="w-full">
                    <Contacts />
                </div>
            </div>
        </section>
    );
}
