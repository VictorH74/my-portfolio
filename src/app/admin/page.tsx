import { RedirectType, redirect } from "next/navigation";
import { cookies } from 'next/headers'


import React from "react";
import { adminSDK } from "@/configs/firebaseAdmingConfig";
import AdminHome from "./AdminHome";

export default async function AdminPage() {
    const loginPage = () => redirect("/admin/login")

    const recoveredToken = cookies().get("token")?.value

    if (!recoveredToken) {
        loginPage()
    }

    let user;

    try {
        const token = await adminSDK.auth().verifyIdToken(recoveredToken!);
        console.log("from server", recoveredToken)
        if (!token) {
            loginPage()
        }

        const { uid } = token;
        user = await adminSDK.auth().getUser(uid);

    } catch (e) {
        console.log(e)
        loginPage()
    }


    return <AdminHome />
}