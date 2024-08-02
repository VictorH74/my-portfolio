'use server'
import { cookies } from "next/headers"

export async function setServerCookie(token: string) {
    cookies().set("token", token)
}