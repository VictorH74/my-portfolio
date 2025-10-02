'use client';
import { auth } from '@/lib/firebase/client';
import { AnimatedBackground } from '@/ui/home_page/sections/Hero/AnimatedBackground';
import { FirebaseError } from 'firebase/app';
import {
    browserLocalPersistence,
    setPersistence,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import nookies from 'nookies';
import React from 'react';

import SubmitButton from './SubmitBtn';

export default function AdminLoginPage() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = React.useState<string | undefined>();

    const signin = async (formData: FormData) => {
        try {
            await setPersistence(auth, browserLocalPersistence);
            const credentials = await setPersistence(
                auth,
                browserLocalPersistence
            ).then(() => {
                return signInWithEmailAndPassword(
                    auth,
                    formData.get('email')!.toString(),
                    formData.get('password')!.toString()!
                );
            });
            const token = await credentials.user.getIdToken();
            // setServerCookie(token);
            nookies.set(undefined, 'firebase_token', token, {
                path: '/',
            });
            router.replace('/admin');
        } catch (e) {
            console.error(e);
            if (
                e instanceof FirebaseError &&
                e.code === 'auth/invalid-credential'
            ) {
                setErrorMsg('Invalid email or password!');
            }
        }
    };

    return (
        <div className="w-screen h-screen grid place-items-center  relative">
            <AnimatedBackground />
            <main className="shadow-xl bg-gray-100 w-full max-w-[400px] px-4 py-10 rounded-lg z-100">
                <Image
                    className="m-auto mb-8"
                    src="/me-logo-v2.svg"
                    alt="logo"
                    width={110}
                    height={110}
                />
                <form action={signin} className="flex flex-col gap-2">
                    {[
                        {
                            name: 'email',
                            type: 'email',
                            placeholder: 'Email',
                            autoFocus: true,
                            required: true,
                        },
                        {
                            name: 'password',
                            type: 'password',
                            placeholder: 'Password',
                            required: true,
                        },
                    ].map((inptData) => (
                        <input
                            key={inptData.name}
                            className="bg-gray-200 p-2 rounded-md text-gray-700"
                            {...inptData}
                        />
                    ))}

                    {errorMsg && (
                        <p className="text-sm text-red-700 font-semibold">
                            {errorMsg}
                        </p>
                    )}

                    <SubmitButton
                        onClick={() => setErrorMsg(() => undefined)}
                    />
                </form>
            </main>
        </div>
    );
}
