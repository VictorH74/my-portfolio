'use client';
import { auth } from '@/configs/firebaseConfig';
// import { setServerCookie } from '@/lib/actions';
import { FirebaseError } from 'firebase/app';
import {
    browserLocalPersistence,
    setPersistence,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import nookies from 'nookies';
import React from 'react';
import SubmitButton from './SubmitBtn';
import Image from 'next/image';

// TODO: fix: fallback path from '<root>/admin' to <root>/[locale]/admin'
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
        <div className="w-screen h-screen grid place-items-center max-[1440px]:bg-[url(/bg-medium.webp)] max-[1921]:bg-[url(/bg-large.webp)] min-[1441px]:bg-[url(/bg-larger.webp)] bg-cover bg-center">
            <main className="shadow-xl bg-gray-100 w-full max-w-[400px] px-4 py-10 rounded-lg">
                <Image
                    className="m-auto"
                    src="/me-logo-v2.svg"
                    alt="logo"
                    width={110}
                    height={110}
                />
                <h2 className="text-center mb-3 font-semibold text-xl text-gray-500 mt-2">
                    Sign in as admin
                </h2>
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
