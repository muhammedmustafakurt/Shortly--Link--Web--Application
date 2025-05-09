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

const failedAttempts = new Map<string, { count: number; lastAttempt: number }>()

export async function POST(req: Request) {
    try {
        const ip = (req.headers.get('x-forwarded-for') || '127.0.0.1').toString()

        const { success } = await rateLimit.limit(ip)
        if (!success) {
            return NextResponse.json(
                { error: 'Çok fazla istek gönderdiniz. Lütfen bekleyin.' },
                { status: 429 }
            )
        }


        const { email, password } = await req.json()


        try {
            loginSchema.parse({ email, password })
        } catch (error) {
            return NextResponse.json(
                { error: 'Geçersiz email veya şifre formatı' },
                { status: 400 }
            )
        }

        const JWT_SECRET = process.env.JWT_SECRET
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET tanımlı değil')
        }


        const now = Date.now()
        const attempts = failedAttempts.get(ip) || { count: 0, lastAttempt: 0 }

        if (attempts.count >= 5 && now - attempts.lastAttempt < 15 * 60 * 1000) {
            return NextResponse.json(
                { error: 'Çok fazla başarısız giriş. 15 dakika sonra tekrar deneyin.' },
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
            failedAttempts.set(ip, {
                count: attempts.count + 1,
                lastAttempt: now
            })
            return NextResponse.json(
                { error: 'Geçersiz email veya şifre' },
                { status: 400 }
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            failedAttempts.set(ip, {
                count: attempts.count + 1,
                lastAttempt: now
            })
            return NextResponse.json(
                { error: 'Geçersiz email veya şifre' },
                { status: 400 }
            )
        }

        failedAttempts.delete(ip)

        const token = jwt.sign(
            {
                sub: user.id,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + 30 * 60 // 30 dakika
            },
            JWT_SECRET,
            { algorithm: 'HS256' }
        )


        const response = NextResponse.json(
            {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            },
            { status: 200 }
        )

        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 30 * 60,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        })

        return response

    } catch (error) {
        console.error('Giriş hatası:', error)
        return NextResponse.json(
            { error: 'Bir sunucu hatası oluştu' },
            { status: 500 }
        )
    }
}