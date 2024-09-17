'use client';
import React from 'react';
import AdminProjectsProvider from '@/contexts/AdminProjectsContext';
import TechCollectionArea from './TechCollectionArea';
import ProjectCollectionArea from './ProjectCollectionArea';
import ProfileArea from './ProfileArea';

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
