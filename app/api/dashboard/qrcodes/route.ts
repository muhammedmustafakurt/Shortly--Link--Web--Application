import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
}

export async function GET() {
    try {
        const cookieStore =await cookies();  // Removed await
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Yetkilendirme tokenı bulunamadı' },
                { status: 401 }
            );
        }

        let userId: string | null = null;
        try {
            const decoded = jwt.verify(token, JWT_SECRET as string) as { sub?: string };  // Changed to sub
            userId = decoded.sub || null;
        } catch (error) {
            console.error('Token doğrulama hatası:', error);
            return NextResponse.json(
                { success: false, error: 'Geçersiz token' },
                { status: 401 }
            );
        }

        if (!userId) {
            return NextResponse.json(
                { success: false, error: 'Kullanıcı kimliği bulunamadı' },
                { status: 401 }
            );
        }

        const shortenedUrls = await prisma.shortenedUrl.findMany({
            where: {
                userId,
                qrCodeUrl: { not: null }  // Only include URLs with QR codes
            },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                originalUrl: true,
                qrCodeUrl: true,
                shortCode: true,
                createdAt: true,
                clicks: true
            }
        });

        return NextResponse.json({
            success: true,
            data: shortenedUrls
        });

    } catch (error: any) {
        console.error('Linkleri getirme hatası:', error);
        return NextResponse.json(
            { success: false, error: 'Sunucu hatası' },
            { status: 500 }
        );
    }
}