import { AdminProjectListProvider } from '@/contexts/AdminProjectListCtx';
import { ProfileArea } from '@/ui/admin_page/ProfileArea';
import { ProjectCollectionArea } from '@/ui/admin_page/ProjectCollectionArea';
import { TechCollectionArea } from '@/ui/admin_page/TechCollectionArea';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Victor Leal - Admin',
};

export default function AdminPage() {
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
}
