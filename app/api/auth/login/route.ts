import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email().max(100),
    password: z.string().min(8).max(100)
})

// Başarısız giriş denemelerini takip etmek için
const failedAttempts = new Map<string, { count: number; lastAttempt: number }>()

export async function POST(req: Request) {
    try {
        const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'

        // Rate limiting kontrolü
        const { success } = await rateLimit.limit(ip)
        if (!success) {
            return NextResponse.json(
                { error: 'Too many requests' },
                {
                    status: 429,
                    headers: {
                        'Retry-After': '60',
                        'X-RateLimit-Limit': '5',
                        'X-RateLimit-Remaining': '0'
                    }
                }
            )
        }

        const { email, password } = await req.json()

        // Input validation
        try {
            loginSchema.parse({ email, password })
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 400 }
            )
        }

        const JWT_SECRET = process.env.JWT_SECRET!
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is not set')
        }

        // Başarısız giriş denemelerini kontrol et
        const now = Date.now()
        const attempts = failedAttempts.get(ip) || { count: 0, lastAttempt: 0 }

        if (attempts.count >= 5 && now - attempts.lastAttempt < 15 * 60 * 1000) {
            return NextResponse.json(
                { error: 'Too many failed attempts. Please try again later.' },
                { status: 429 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                name: true,
                password: true
            }
        })

        if (!user) {
            // Başarısız giriş denemesini kaydet
            failedAttempts.set(ip, {
                count: attempts.count + 1,
                lastAttempt: now
            })
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 400 }
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            // Başarısız giriş denemesini kaydet
            failedAttempts.set(ip, {
                count: attempts.count + 1,
                lastAttempt: now
            })
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 400 }
            )
        }

        // Başarılı giriş - başarısız denemeleri sıfırla
        failedAttempts.delete(ip)

        const token = jwt.sign(
            {
                sub: user.id,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (30 * 60) // 30 dakika
            },
            JWT_SECRET,
            {
                algorithm: 'HS256'
            }
        )

        const response = NextResponse.json(
            {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            },
            {
                status: 200,
                headers: {
                    'X-Content-Type-Options': 'nosniff',
                    'X-Frame-Options': 'DENY',
                    'X-XSS-Protection': '1; mode=block',
                    'Referrer-Policy': 'strict-origin-when-cross-origin',
                    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
                    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
                    'Cache-Control': 'no-store, max-age=0'
                }
            }
        )

        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 30 * 60, // 30 dakika
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        })

        return response
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}