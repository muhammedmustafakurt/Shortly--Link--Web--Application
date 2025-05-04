import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json()

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already exists' },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name }
        })

        const JWT_SECRET = process.env.JWT_SECRET!
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' })

        // ✅ Cookie'yi NextResponse ile ayarlıyoruz
        const response = NextResponse.json({ user }, { status: 201 })
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
