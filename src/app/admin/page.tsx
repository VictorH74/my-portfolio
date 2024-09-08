import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import React from 'react';
import { adminSDK } from '@/configs/firebaseAdminConfig';
import AdminHome from './AdminHome';

export default async function AdminPage() {
    const loginPage = () => redirect('/admin/login');

    // TODO: create middleware file to put the code below
    const recoveredToken = cookies().get('token')?.value;

    if (!recoveredToken) loginPage();

    try {
        const token = await adminSDK.auth().verifyIdToken(recoveredToken!);
        if (!token) loginPage();

        const { uid } = token;
        await adminSDK.auth().getUser(uid);
    } catch (e) {
        console.error(e);
        loginPage();
    }

    return <AdminHome />;
}
