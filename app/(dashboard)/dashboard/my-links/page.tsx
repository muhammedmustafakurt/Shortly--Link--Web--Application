'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ShortenedUrl {
    id: string;
    originalUrl: string;
    shortCode: string;
    createdAt: string;
    clicks: number;
}

export default function UrlListPage() {
    const [urls, setUrls] = useState<ShortenedUrl[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const response = await fetch('/api/dashboard/urls');
                const data = await response.json();

                if (data.success) {
                    setUrls(data.data);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUrls();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
                <div className="text-xl font-semibold text-gray-700">Yükleniyor...</div>
            </div>
        );
    }

    if (urls.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow p-6 md:p-8 text-center w-full max-w-md">
                    <p className="text-gray-500">Henüz URL oluşturmadınız.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">URL'lerim</h1>

                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orijinal Link</th>
                            <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kısa Link</th>
                            <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oluşturulma</th>
                            <th className="px-4 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tıklanma</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {urls.map((url) => (
                            <tr key={url.id} className="hover:bg-gray-50">
                                <td className="px-4 py-4 max-w-xs overflow-hidden text-ellipsis">
                                    <div className="text-sm text-gray-900 truncate" title={url.originalUrl}>
                                        {url.originalUrl}
                                    </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <Link
                                        href={`/${url.shortCode}`}
                                        target="_blank"
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        {typeof window !== 'undefined' && `${window.location.host}/${url.shortCode}`}
                                    </Link>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {new Date(url.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {url.clicks}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}