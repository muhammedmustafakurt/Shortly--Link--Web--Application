import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET
const API_BASE_URL = process.env.API_BASE_URL || 'https://www.kisaltl.ink/api'

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
            algorithms: ['HS256'],
            maxTokenAge: '30m' // Token'ın maksimum yaşını kontrol et
        })

        const userId = payload.sub as string | undefined

        if (!userId) {
            console.log('Token payload missing userId')
            return redirectToLogin(request)
        }

        // API'ye istek yaparak kullanıcıyı doğrula
        try {
            const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'

            const apiResponse = await fetch(`${API_BASE_URL}/auth/verify-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${authToken}` ,
                    'X-Requested-With': 'XMLHttpRequest', // CSRF koruması için
                    'X-Forwarded-For': ip
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
            requestHeaders.set('X-Content-Type-Options', 'nosniff')
            requestHeaders.set('X-Frame-Options', 'DENY')
            requestHeaders.set('X-XSS-Protection', '1; mode=block')
            requestHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin')
            requestHeaders.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';")
            requestHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
            requestHeaders.set('Cache-Control', 'no-store, max-age=0')

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