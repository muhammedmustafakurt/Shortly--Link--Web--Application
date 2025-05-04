import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()
        const JWT_SECRET = process.env.JWT_SECRET!

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 400 }
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 400 }
            )
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' })

        // ✅ Cookie'yi response ile set et
        const response = NextResponse.json({ user }, { status: 200 })
        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 86400, // 1 gün
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        })

        return response
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
