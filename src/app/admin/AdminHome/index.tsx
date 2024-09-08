'use client';
import React from 'react';
import { auth } from '@/configs/firebaseConfig';
import AdminProjectsProvider from '@/contexts/AdminProjectsContext';
import TechCollectionArea from './TechCollectionArea';
import CvArea from './CvArea';
import ProjectCollectionArea from './ProjectCollectionArea';

export default function AdminHome() {
    return (
        <AdminProjectsProvider>
            <main className="w-full mx-auto max-w-[1400px] py-6">
                <div className="rounded-md p-3 text-center my-3 bg-white dark:bg-[#3f3f3f] primary-font-color">
                    <span className="font-semibold">Admin:</span>{' '}
                    <span>{auth.currentUser?.email}</span>
                </div>

                <ProjectCollectionArea />

                <TechCollectionArea />

                <CvArea />
            </main>
        </AdminProjectsProvider>
    );
}
