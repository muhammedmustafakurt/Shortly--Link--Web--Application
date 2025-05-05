"use client";
// app/page.tsx
import { useState } from "react";
import QRForm from "@/app/components/QRForm";
import Image from "next/image";

export default function Home() {
    const [url, setUrl] = useState<string>("");

    return (
        <div className="min-h-screen bg-blue-400 text-lime-300 flex items-center justify-center -mt-12 p-6">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                <main>
                    <QRForm/>
                </main>

                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="bg-white text-blue-900 p-4 rounded-md shadow-lg w-full text-center animate-pulse">
                        <p className="text-sm">Orijinal Link:</p>
                        <p className="font-bold truncate">https://www.cokuzunbirinternetadresi.com/cok/uzun/yol</p>
                    </div>

                    <div className="text-3xl font-extrabold text-amber-300 animate-bounce">↓</div>

                    <div
                        className="bg-white p-4 rounded-md shadow-lg w-full max-w-xs mx-auto text-center border border-gray-200">
                        <p className="text-gray-600 text-sm mb-3">QR KOD</p>
                        <Image
                            src="/qrcode.jpg"
                            width={500}
                            height={500}
                            alt="Picture of the author"
                        />

                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>
    );
}
