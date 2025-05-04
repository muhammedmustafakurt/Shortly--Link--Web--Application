"use client";
import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";

type QRCode = {
    id: string;
    originalUrl: string;
    shortCode: string;
    qrCodeUrl: string;
    createdAt: string;
    clicks: number;
};

export default function QRListPage() {
    const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQrCodes = async () => {
            try {
                const response = await fetch('/api/dashboard/qrcodes');
                const data = await response.json();

                if (data.success) {
                    setQrCodes(data.data);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQrCodes();
    }, []);

    const downloadQRCode = (url: string, shortCode: string) => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `qr-code-${shortCode}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    };

    if (loading) {
        return <div className="min-h-screen bg-gray-100 p-8">Yükleniyor...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">QR Kodlarım</h1>

                {qrCodes.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <p className="text-gray-500">Henüz QR kod oluşturmadınız.</p>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QR Kod</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orijinal Link</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kısa Kod</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oluşturulma</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tıklanma</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {qrCodes.map((qr) => (
                                    <tr key={qr.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex justify-center">
                                                <Image
                                                    src={qr.qrCodeUrl || "/qrcode.jpg"}
                                                    width={50}
                                                    height={50}
                                                    alt={`QR Code for ${qr.shortCode}`}
                                                    className="h-10 w-10"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis">
                                            <div className="text-sm text-gray-900 truncate" title={qr.originalUrl}>
                                                {qr.originalUrl}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                href={`/${qr.shortCode}`}
                                                target="_blank"
                                                className="text-sm text-blue-600 hover:text-blue-800"
                                            >
                                                {typeof window !== 'undefined' && `${window.location.host}/${qr.shortCode}`}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {new Date(qr.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {qr.clicks}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => downloadQRCode(qr.qrCodeUrl, qr.shortCode)}
                                                className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100"
                                                title="QR Kodu İndir"
                                            >
                                                <FiDownload className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Sayfalama veya ek butonlar */}
                        <div className="mt-4 flex justify-between items-center">
                            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                                Önceki
                            </button>
                            <span className="text-sm text-gray-700">Sayfa 1 / 3</span>
                            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                                Sonraki
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}