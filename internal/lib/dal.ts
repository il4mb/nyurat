"use server"
import { cookies } from 'next/headers'
import { decrypt } from './session'
import { cache } from 'react'
import { UserProps } from '../types'
import { getUserById } from '../action/user'

export const getUser = cache(async (): Promise<UserProps | any> => {
    const cookie = (await cookies()).get("session-token")?.value
    const session = await decrypt(cookie)
    if (!session) return null;
    const user = await getUserById(session.uid as string);
    return { ...user, _id: user?._id.toString() };
})

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session-token')?.value
    const session = await decrypt(cookie)

})