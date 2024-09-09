'use client';
import React from 'react';
import AdminProjectsProvider from '@/contexts/AdminProjectsContext';
import TechCollectionArea from './TechCollectionArea';
import CvArea from './CvArea';
import ProjectCollectionArea from './ProjectCollectionArea';

export default function AdminHome() {
    return (
        <AdminProjectsProvider>
            <main className="w-full mx-auto max-w-[1400px] py-6">
                <div className="rounded-md py-4 text-center my-3 bg-[var(--theme-color)] text-custom-white">
                    <h1 className="uppercase font-semibold text-xl tracking-wider">
                        Admin area
                    </h1>
                </div>

                <ProjectCollectionArea />

                <TechCollectionArea />

                <CvArea />
            </main>
        </AdminProjectsProvider>
    );
}
