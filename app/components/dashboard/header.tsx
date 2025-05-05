"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const navItems = [
        { href: "/dashboard/links", label: "Link Kısalt" },
        { href: "/dashboard/qr-codes", label: "QR kod oluştur" },
        { href: "/dashboard/my-links", label: "Kısaltılmış Linklerim" },
        { href: "/dashboard/my-qr-codes", label: "QR Kodlarım" },
        { href: "/dashboard/settings", label: "Ayarlar" },
    ];

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/dashboard/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            if (response.ok) router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/dashboard" className="text-lg font-semibold text-black">
                        Kisaltl.ink Gösterge paneli
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-black hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
                        >
                            {menuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>

                    {/* Logout button - desktop */}
                    <button
                        onClick={handleLogout}
                        className="hidden md:block text-black hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        Çıkış Yap
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div
                className={clsx(
                    "md:hidden bg-white shadow-md",
                    menuOpen ? "block" : "hidden"
                )}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <button
                        onClick={() => {
                            handleLogout();
                            setMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-black hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </header>
    );
}