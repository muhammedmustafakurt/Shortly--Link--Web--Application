import { NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ message: 'URL is required' }, { status: 400 });
        }

        const qrCode = await QRCode.toDataURL(url);
        return NextResponse.json({ qrCode });
    } catch (error) {
        console.error('QR code generation failed:', error);
        return NextResponse.json({ message: 'QR code generation failed' }, { status: 500 });
    }
}
