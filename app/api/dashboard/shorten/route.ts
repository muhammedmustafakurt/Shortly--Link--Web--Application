import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
}

export async function POST(request: Request) {
    try {
        const { originalUrl, shortCode } = await request.json();

        try {
            new URL(originalUrl);
        } catch {
            return NextResponse.json(
                { error: 'Geçersiz URL formatı' },
                { status: 400 }
            );
        }

        const cookieStore =await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Yetkilendirme tokenı bulunamadı' },
                { status: 401 }
            );
        }

        let userId: string | null = null;
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { sub?: string };
            userId = decoded.sub || null;
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

        const shortenedUrl = await prisma.shortenedUrl.create({
            data: {
                originalUrl,
                shortCode,
                userId: userId,
            },
        });

        return NextResponse.json(shortenedUrl);
    } catch (error: any) {
        console.error('Link kısaltma hatası:', error);

        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'Bu kısa kod zaten kullanılıyor, lütfen tekrar deneyin' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Sunucu hatası' },
            { status: 500 }
        );
    }
}