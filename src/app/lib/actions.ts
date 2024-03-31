'use server'

import { auth } from "@/configs/firebaseConfig"
import { FirebaseError } from "firebase/app"
import { inMemoryPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth"
import { cookies } from "next/headers"


export async function authenticate(formData: FormData) {
    try {
        let data: string[] = []
        formData.forEach(a => data.push(a as string))

        await setPersistence(auth, inMemoryPersistence)
        const credentials = await signInWithEmailAndPassword(auth, data[0], data[1])
        const token = await credentials.user.getIdToken()
        cookies().set("token", token)
        return token;

    } catch (error) {
        if (error instanceof FirebaseError)
            throw error.message
        else
            throw error
    }
}

export async function setServerCookie(token: string) {
    cookies().set("token", token)
}