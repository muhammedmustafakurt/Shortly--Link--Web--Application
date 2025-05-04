"use client"
import React, {useState} from 'react'
import Link from 'next/link'
import Popup from "@/app/components/Popup";
export default function Dashboard() {
    const [isPopupOpen, setIsPopupOpen] = useState(true); 
    return (
        <div className="min-h-screen bg-gray-100">
            <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
                <div className="p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-blue-500 mb-4">
                        Dashboard Kılavuzu
                    </h2>
                    <div className="space-y-4 text-gray-700 mb-6">
                        <div>
                            <h3 className="font-medium text-lg">🔗 Link Kısalt</h3>
                            <p>Uzun URL'lerinizi kısa linklere dönüştürün ve paylaşın.</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-lg">📊 Kısaltılmış Linklerim</h3>
                            <p>Oluşturduğunuz tüm kısa linkleri ve tıklanma istatistiklerini görüntüleyin.</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-lg">🖼️ QR Kod Oluştur</h3>
                            <p>URL'leriniz için özelleştirilebilir QR kodları oluşturun.</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-lg">📈 QR Kodlarım</h3>
                            <p>QR kodlarınızın performansını takip edin.</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <p className="text-gray-700">
                            <span className="font-medium">Geliştirici:</span> <strong>Muhammed Mustafa Kurt</strong>
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">GitHub:</span>{" "}
                            <Link
                                href="https://github.com/muhammedmustafakurt"
                                className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
                            >
                               <strong>github.com/muhammedmustafakurt</strong>
                            </Link>
                        </p>
                    </div>
                </div>
            </Popup>
            <main className="pt-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
                        <h1 className="text-4xl font-bold mb-4 text-gray-800">Kisalt.ink Gösterge Paneli</h1>
                        <p className="text-lg text-gray-600">Gösterge Paneline Hoş Geldiniz!</p>

                    </div>
                </div>
            </main>
        </div>
    )
}