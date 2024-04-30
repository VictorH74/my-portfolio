import { redirect } from 'next/navigation';
import React from 'react';
import { cookies } from "next/headers"
import LoginForm from './LoginForm';

export default async function AdminLoginPage() {
    const token = cookies().get("token")?.value
    if (token) return redirect("../admin")
    return (<LoginForm />)
}