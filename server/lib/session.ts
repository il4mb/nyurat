import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

const secretKey = process.env.JWT_SECRET
if (!secretKey) {
    throw new Error('JWT_SECRET is not defined')
}
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt<T extends JWTPayload>(payload: T) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt<T extends JWTPayload>(session: string | undefined = ''): Promise<T | null> {
    if (!session || session == "") return null
    try {
        const { payload } = await jwtVerify(session, encodedKey, { algorithms: ['HS256'] })
        return payload as T
    } catch (error) {
        console.error('Failed to verify session:', error)
        return null
    }
}