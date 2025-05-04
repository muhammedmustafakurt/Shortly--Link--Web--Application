import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { v2 as cloudinary } from 'cloudinary';
import jwt from "jsonwebtoken";
import prisma from '@/lib/prisma';
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url, shortCode } = body; // Add shortCode to the request body

        if (!url) {
            return NextResponse.json({ message: 'URL is required' }, { status: 400 });
        }

        if (!shortCode) {
            return NextResponse.json({ message: 'Short code is required' }, { status: 400 });
        }

        // Verify user token
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Authorization token not found' },
                { status: 401 }
            );
        }

        let userId: string | null = null;
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { userId?: string };
            userId = decoded.userId || null;
        } catch (error) {
            console.error('Token verification error:', error);
            return NextResponse.json(
                { error: 'Invalid token' },
                { status: 401 }
            );
        }

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID not found' },
                { status: 401 }
            );
        }

        // Generate QR code
        const qrCodeDataUrl = await QRCode.toDataURL(url);
        const base64Data = qrCodeDataUrl.replace(/^data:image\/\w+;base64,/, '');

        // Upload to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                `data:image/png;base64,${base64Data}`,
                {
                    folder: 'qr-codes',
                    public_id: `qr-${Date.now()}`,
                    overwrite: false,
                    resource_type: 'image'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
        });

        const updatedUrl = await prisma.shortenedUrl.update({
            where: {
                shortCode: shortCode,
                userId: userId
            },
            data: {
                qrCode: qrCodeDataUrl,
                qrCodeUrl: uploadResult.secure_url
            }
        });

        return NextResponse.json({
            qrCodeDataUrl,
            cloudinaryUrl: uploadResult.secure_url,
            cloudinaryPublicId: uploadResult.public_id,
            updatedShortUrl: updatedUrl
        });

    } catch (error) {
        console.error('QR code generation or upload failed:', error);
        return NextResponse.json(
            { message: 'QR code generation or upload failed' },
            { status: 500 }
        );
    }
}