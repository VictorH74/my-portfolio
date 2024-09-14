'use client';
import React from 'react';
import AdminProjectsProvider from '@/contexts/AdminProjectsContext';
import TechCollectionArea from './TechCollectionArea';
import CvArea from './CvArea';
import ProjectCollectionArea from './ProjectCollectionArea';
import ContactListArea from './ContactListArea';

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

                <ContactListArea />

                <CvArea />
            </main>
        </AdminProjectsProvider>
    );
}
