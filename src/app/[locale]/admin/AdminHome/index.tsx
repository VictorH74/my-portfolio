'use client';
import { AdminProjectListProvider } from '@/contexts/AdminProjectListCtx';
import React from 'react';

import { ProfileArea } from './ProfileArea';
import { ProjectCollectionArea } from './ProjectCollectionArea';
import { TechCollectionArea } from './TechCollectionArea';

export const AdminHome = () => {
    return (
        <AdminProjectListProvider>
            <main className="w-full mx-auto px-2 max-w-[1400px] py-6 space-y-12 pb-14">
                <div className="rounded-md py-4 text-center bg-gray-300 text-gray-600">
                    <h1 className="uppercase font-semibold text-xl tracking-wider">
                        Admin area
                    </h1>
                </div>

                <ProfileArea />

                <ProjectCollectionArea />

                <TechCollectionArea />
            </main>
        </AdminProjectListProvider>
    );
};
