import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { rateLimit } from '@/lib/rate-limit'
import { z } from 'zod'

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set')
}



export async function POST(req: Request) {
    try {
        // Rate limiting kontrolü - DÜZELTİLDİ
        const ip = (req.headers.get('x-forwarded-for') || '127.0.0.1').toString()
        const { success } = await rateLimit.limit(ip)
        if (!success) {
            return NextResponse.json(
                { error: 'Too many requests' },
                { status: 429 }
            )
        }

        const body = await req.json()
        

        const { email, password, name } = body

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already exists' },
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        })

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '1d',
    algorithm: 'HS256'
});

        const response = NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        }, { status: 201 })

        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 86400,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        })

        return response
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            { error: 'Registration failed' },
            { status: 500 }
        )
    }
}