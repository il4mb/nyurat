import type { NextRequest } from 'next/server'
import { decrypt } from '@internal/lib/session'

export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl
    // Ignore requests to /api/auth
    if (pathname.startsWith('/api/auth') || pathname.startsWith('/signin')) {
        return
    }

    const tokenSession = request.cookies.get('session-token')?.value
    const session = await decrypt(tokenSession || "")

    if (!session && pathname.startsWith('/dashboard')) {
        return Response.redirect(new URL('/signin', request.url))
    }

    if (!session && pathname.startsWith('/api')) {
        return Response.json({
            status: false,
            code: 401,
            message: "Unauthorized"
        })
    }
}

export const config = {
    matcher: ['/dashboard', '/dashboard/:path*', '/signin', '/api/:path*'],
}
