"use client";

import { useState } from "react";
import ShortenForm from "@/app/components/dashboardLinks";
export default function Home() {
    const [url, setUrl] = useState<string>("");

    return (
        <div className="min-h-screen bg-gray-500 text-lime-300 flex items-center justify-center -mt-12 p-6">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                <main>
                    <ShortenForm/>
                </main>

                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="bg-white text-black p-4 rounded-md shadow-lg w-full text-center animate-pulse">
                        <p className="text-sm">Orijinal Link:</p>
                        <p className="font-bold truncate">https://www.cokuzunbirinternetadresi.com/cok/uzun/yol</p>
                    </div>

                    <div className="text-3xl font-extrabold text-amber-300 animate-bounce">↓</div>

                    <div className="bg-amber-400 text-black p-4 rounded-md shadow-lg w-full text-center">
                        <p className="text-sm">Kısaltılmış Link:</p>
                        <p className="font-bold">kisaltl.ink/kısakod</p>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>
    );
}
