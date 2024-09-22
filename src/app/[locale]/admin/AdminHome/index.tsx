'use client';
import AdminProjectsProvider from '@/contexts/AdminProjectsContext';
import React from 'react';

import ProfileArea from './ProfileArea';
import ProjectCollectionArea from './ProjectCollectionArea';
import TechCollectionArea from './TechCollectionArea';

export default function AdminHome() {
    return (
        <AdminProjectsProvider>
            <main className="w-full mx-auto px-2 max-w-[1400px] py-6 space-y-6">
                <div className="rounded-md py-4 text-center bg-[var(--theme-color)] text-custom-white">
                    <h1 className="uppercase font-semibold text-xl tracking-wider">
                        Admin area
                    </h1>
                </div>

                <ProjectCollectionArea />

                <TechCollectionArea />

                <ProfileArea />
            </main>
        </AdminProjectsProvider>
    );
}
