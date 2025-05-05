'use client';

import React, { useState } from 'react';

export default function ShortenForm() {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const generateShortCode = () => {
        return Math.random().toString(36).substring(2, 8);
    };

    const handleCopy = async (text: string) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                document.body.appendChild(textArea);
                textArea.select();

                try {
                    const success = document.execCommand('copy');
                    if (success) {
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                    } else {
                        throw new Error('Fallback copy failed');
                    }
                } finally {
                    document.body.removeChild(textArea);
                }
            }
        } catch (err) {
            console.error('Kopyalama başarısız:', err);
            alert('Link kopyalanamadı. Manuel olarak kopyalayın.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const shortCode = generateShortCode();

            const response = await fetch('/api/dashboard/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ originalUrl: url, shortCode }),
            });

            if (!response.ok) {
                throw new Error('Link kısaltma işlemi başarısız oldu');
            }
            const data = await response.json();
            setShortUrl(`${window.location.origin}/${data.shortCode}`);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                Gösterge paneli link kısalt
            </h1>
            <p className="text-white text-lg md:text-xl">
                Gösterge panelinden ürettiğiniz linkler sizin giriş kimliğinize bağlıdır tıklanma sayısını ve linklerinizi kontrol edebilirsiniz.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
                <input
                    type="text"
                    placeholder="Uzun linkinizi yapıştırın"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="px-5 py-3 bg-white rounded-md text-black w-full sm:w-auto"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer bg-amber-400 text-white px-6 py-3 rounded-md font-semibold hover:bg-amber-500 transition disabled:opacity-50"
                >
                    {loading ? 'İşleniyor...' : 'Linki Kısalt'}
                </button>
            </form>

            {error && <p className="text-red-500">{error}</p>}
            {shortUrl && (
                <div className="bg-white text-blue-900 p-4 rounded-md shadow-lg w-full max-w-3xl mx-auto">
                    <ul>
                        <li className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <span
                                    className="font-bold block text-sm sm:inline-block mb-1 sm:mb-0 sm:mr-2">Son Kısaltılan:</span>
                                <span className="break-all text-sm whitespace-normal block">{url}</span>
                            </div>
                            <span className="hidden sm:inline text-sm text-blue-900">→</span>


                            <div className="flex-1 min-w-0">
                                <span className="font-bold block text-sm sm:inline-block mb-1 sm:mb-0 sm:mr-2">Kısaltılmış Link:</span>
                                <a
                                    href={shortUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-amber-400 text-sm break-all whitespace-normal block hover:underline"
                                >
                                    {shortUrl}
                                </a>
                            </div>
                            <button
                                onClick={() => handleCopy(shortUrl)}
                                className="cursor-pointer p-2 rounded-md hover:bg-amber-100 transition-colors"
                                title={isCopied ? "Kopyalandı" : "Kopyala"}
                            >
                                {isCopied ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                         fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path d="M20 6L9 17l-5-5"/>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                         fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}