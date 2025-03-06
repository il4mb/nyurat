"use server"
import { cookies } from 'next/headers'
import { decrypt } from './session'
import { cache } from 'react'
import { UserProps } from '@/app/types'

export const getUser = cache(async (): Promise<UserProps | any> => {
    const cookie = (await cookies()).get("session-token")?.value
    const session = await decrypt(cookie)
    if (!session?._id) return null
    return session;
})

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session-token')?.value
    const session = await decrypt(cookie)

})