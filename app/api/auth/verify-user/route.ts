import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import prisma from '@/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set')
}

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const token = authHeader.split(' ')[1]
        const { userId } = await request.json()

        // Token'ı doğrula
        const secret = new TextEncoder().encode(JWT_SECRET)
        const { payload } = await jwtVerify(token, secret, {
            algorithms: ['HS256']
        })

        // Token'daki userId ile istekteki userId eşleşmeli
        if (payload.userId !== userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        // Kullanıcıyı veritabanından bul
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(user)

    } catch (error) {
        console.error('Verification error:', error)
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 401 }
        )
    }
}