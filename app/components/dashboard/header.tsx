// components/header.tsx
"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/dashboard/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                router.push("/"); // Redirect to home page after logout
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <Link href="/dashboard" className="text-xl font-bold text-gray-800">
                    Kisaltl.ink Gösterge Paneli
                </Link>

                <nav className="hidden md:flex space-x-6">
                    <Link href="/dashboard/links" className="text-gray-600 hover:text-gray-900">Link Kısalt</Link>
                    <Link href="/dashboard/qr-codes" className="text-gray-600 hover:text-gray-900">QR kod oluştur</Link>
                    <Link href="/dashboard/my-links" className="text-gray-600 hover:text-gray-900">Kısaltılmış Linklerim</Link>
                    <Link href="/dashboard/my-qr-codes" className="text-gray-600 hover:text-gray-900">QR Kodlarım</Link>
                    <Link href="/dashboard/settings" className="text-gray-600 hover:text-gray-900">Ayarlar</Link>
                    <button
                        onClick={handleLogout}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Çıkış Yap
                    </button>
                </nav>

                <button
                    className="md:hidden text-gray-600 z-50"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Drawer Menu */}
            <div className={clsx(
                "fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 z-40",
                menuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-4 space-y-4">
                    <Link href="/dashboard/links" className="block text-gray-700 hover:text-black">Link Kısalt</Link>
                    <Link href="/dashboard/qr-codes" className="block text-gray-700 hover:text-black">QR kod oluştur</Link>
                    <Link href="/dashboard/my-links" className="block text-gray-700 hover:text-black">Kısaltılmış Linklerim</Link>
                    <Link href="/dashboard/my-qr-codes" className="block text-gray-700 hover:text-black">QR Kodlarım</Link>
                    <Link href="/dashboard/settings" className="block text-gray-700 hover:text-black">Ayarlar</Link>
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer block text-gray-700 hover:text-black w-full text-left"
                    >
                        Çıkış
                    </button>
                </div>
            </div>

            {/* Overlay when menu is open */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </header>
    );
}