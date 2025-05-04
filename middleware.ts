import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api'

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set')
}

export async function middleware(request: NextRequest) {
    console.log('Middleware executing for:', request.url)

    try {
        const authToken = request.cookies.get('token')?.value

        if (!authToken) {
            console.log('No auth token found in cookies')
            return redirectToLogin(request)
        }

        // JWT doğrulama
        const secret = new TextEncoder().encode(JWT_SECRET)
        const { payload } = await jwtVerify(authToken, secret, {
            algorithms: ['HS256']
        })

        const userId = payload.userId as string | undefined

        if (!userId) {
            console.log('Token payload missing userId')
            return redirectToLogin(request)
        }

        // API'ye istek yaparak kullanıcıyı doğrula
        try {
            const apiResponse = await fetch(`${API_BASE_URL}/auth/verify-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ userId })
            })

            if (!apiResponse.ok) {
                console.log('User verification failed via API')
                return redirectToLogin(request)
            }

            const userData = await apiResponse.json()

            console.log(`Authenticated user: ${userData.email}`)


            const requestHeaders = new Headers(request.headers)
            requestHeaders.set('x-user-id', userData.id)

            return NextResponse.next({
                request: {
                    headers: requestHeaders
                }
            })

        } catch (apiError) {
            console.error('API request failed:', apiError)
            return NextResponse.json(
                { error: 'API error' },
                { status: 500 }
            )
        }

    } catch (error) {
        console.error('Authentication failed:', error)
        return redirectToLogin(request)
    }
}

function redirectToLogin(request: NextRequest) {
    console.log('Redirecting to login')
    const loginUrl = new URL('/pages/login', request.url)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete('token')
    return response
}

export const config = {
    matcher: [
        '/dashboard/:path*',
    ]
}