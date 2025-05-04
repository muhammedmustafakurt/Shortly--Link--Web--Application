import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
}

export async function POST(request: Request) {
    try {
        const { currentPassword, newPassword } = await request.json();

        if (newPassword.length < 6) {
            return NextResponse.json(
                { error: 'Şifre en az 6 karakter olmalıdır' },
                { status: 400 }
            );
        }

        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            return NextResponse.json(
                { error: 'Yetkilendirme tokenı bulunamadı' },
                { status: 401 }
            );
        }

        let userId: string | null = null;
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { userId?: string };
            userId = decoded.userId || null;
        } catch (error) {
            console.error('Token doğrulama hatası:', error);
            return NextResponse.json(
                { error: 'Geçersiz token' },
                { status: 401 }
            );
        }

        if (!userId) {
            return NextResponse.json(
                { error: 'Kullanıcı kimliği bulunamadı' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Kullanıcı bulunamadı' },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Mevcut şifre yanlış' },
                { status: 401 }
            );
        }


        const hashedPassword = await bcrypt.hash(newPassword, 10);


        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        return NextResponse.json(
            { message: 'Şifre başarıyla güncellendi' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Şifre değiştirme hatası:', error);

        return NextResponse.json(
            { error: 'Sunucu hatası' },
            { status: 500 }
        );
    }
}