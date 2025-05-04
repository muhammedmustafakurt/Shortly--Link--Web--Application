import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
    request: Request,
    { params }: { params: { shortCode: string } }
) {
    try {
        const url = await prisma.shortenedUrl.findUnique({
            where: { shortCode: params.shortCode }
        })

        await prisma.shortenedUrl.update({
            where: { id: url.id },
            data: { clicks: url.clicks + 1 }
        })

        return NextResponse.redirect(new URL(url.originalUrl), { status: 307 })
    } catch (error) {
        console.error('Error fetching URL:', error)
    }
}