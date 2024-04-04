import { redirect } from "next/navigation";
import { cookies } from 'next/headers'
import React from "react";
import { adminSDK } from "@/configs/firebaseAdmingConfig";
import AdminHome from "./AdminHome";
import { fetchTechnologies } from "@/utils/functions";

export default async function AdminPage() {
    const loginPage = () => redirect("/admin/login")

    const recoveredToken = cookies().get("token")?.value

    if (!recoveredToken) loginPage()

    let user;
    let techs;

    try {
        const token = await adminSDK.auth().verifyIdToken(recoveredToken!);
        if (!token) loginPage()

        const { uid } = token;
        user = await adminSDK.auth().getUser(uid);

        // techologolies fetching
        techs = await fetchTechnologies()

    } catch (e) {
        console.error(e)
        loginPage()
    }


    return <AdminHome techs={techs} />
}