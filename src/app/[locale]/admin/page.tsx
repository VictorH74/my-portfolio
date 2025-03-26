import React from 'react';

import { AdminHome } from './AdminHome';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Victor Leal - Admin',
};

export default function AdminPage() {
    return <AdminHome />;
}
