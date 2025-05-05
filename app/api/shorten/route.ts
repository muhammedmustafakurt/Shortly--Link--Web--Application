import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

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

        const shortenedUrl = await prisma.shortenedUrl.create({
            data: {
                originalUrl,
                shortCode,
                userId: 'null',
            },
        });

        return NextResponse.json(shortenedUrl);
    } catch (error) {
        console.error('Link kısaltma hatası:', error);

        if (error instanceof Error && 'code' in error && error.code === 'P2002') {
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