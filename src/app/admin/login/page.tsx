"use client"
import { setServerCookie } from "@/lib/actions";
import { ThemeProvider } from "@/contexts/ThemeColor";
import { useRouter } from "next/navigation";
import React from "react";
import nookies from "nookies"
import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";
import SubmitButton from "./SubmitButton";
import { FirebaseError } from "firebase/app";

export default function AdminLoginPage() {
    return (
        <ThemeProvider>
            <LoginFormChildren />
        </ThemeProvider>
    )
}

const LoginFormChildren = () => {
    const router = useRouter()
    const [errorMsg, setErrorMsg] = React.useState<string | undefined>();

    return (
        <div className='w-screen h-screen grid place-items-center'>
            <main className='shadow-xl bg-gray-200 dark:bg-[#3f3f3f] w-full max-w-[400px] px-4 py-10 rounded-lg'>
                <h2 className='text-center mb-3 font-semibold text-base dark:text-white text-gray-500'>Sign in as admin</h2>
                <form action={async (formData) => {
                    try {
                        await setPersistence(auth, browserLocalPersistence)
                        const credentials = await setPersistence(auth, browserLocalPersistence)
                            .then(() => {
                                return signInWithEmailAndPassword(auth,
                                    formData.get("email")?.toString()!,
                                    formData.get("password")?.toString()!
                                );
                            })
                        const token = await credentials.user.getIdToken()
                        setServerCookie(token)
                        nookies.set(undefined, 'token', token, { path: '/' });
                        router.replace("/admin")
                    } catch (e) {
                        console.error(e)
                        if (e instanceof FirebaseError && e.code === "auth/invalid-credential") {
                            setErrorMsg("Invalid email or password!")
                        }
                    }
                }} className='flex flex-col gap-2'  >

                    <input
                        className='dark:bg-[#1d1d1d] p-2 rounded-md text-gray-700 dark:text-white'
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />

                    <input
                        className='dark:bg-[#1d1d1d] p-2 rounded-md text-gray-700 dark:text-white'
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />

                    {
                        errorMsg && (<p className="text-sm text-red-700 font-semibold">{errorMsg}</p>)
                    }

                    <SubmitButton onClick={() => setErrorMsg(() => undefined)} />
                </form>
            </main>
        </div>
    )
}