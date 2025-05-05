import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: NextRequest,
    { params }: { params: { shortCode: string } }
) {
    try {
        const url = await prisma.shortenedUrl.findUnique({
            where: { shortCode: params.shortCode },
        });

        if (!url) {
            return NextResponse.json({ error: 'Short URL not found' }, { status: 404 });
        }

        await prisma.shortenedUrl.update({
            where: { id: url.id },
            data: { clicks: url.clicks + 1 },
        });

        return NextResponse.redirect(url.originalUrl, 307);
    } catch (error) {
        console.error('Error fetching URL:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
