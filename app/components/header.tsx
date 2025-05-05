"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function Header() {
    const [menuOpen, setMenuOpen] = React.useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md rounded-full mx-4 mt-4 mb-6 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex justify-between items-center h-20 py-2">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                            <Image
                                src="/kısaltl.ınk.png"
                                alt="Logo"
                                width={220}
                                height={80}
                                className="w-auto rounded-lg"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-10">
                        <nav className="flex space-x-8 tracking-wide">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-amber-400 text-sm font-semibold px-3 py-2 rounded-md hover:bg-amber-50 transition-all duration-300"
                            >
                                Link Kısaltıcı
                            </Link>
                            <Link
                                href="/pages/qrcodegenerator"
                                className="text-gray-700 hover:text-amber-400 text-sm font-semibold px-3 py-2 rounded-md hover:bg-amber-50 transition-all duration-300"
                            >
                                QR Kod Oluşturucu
                            </Link>
                            <Link
                                href="/pages/about"
                                className="text-gray-700 hover:text-amber-400 text-sm font-semibold px-3 py-2 rounded-md hover:bg-amber-50 transition-all duration-300"
                            >
                                Hakkımızda
                            </Link>
                            <Link
                                href="/pages/contact"
                                className="text-gray-700 hover:text-amber-400 text-sm font-semibold px-3 py-2 rounded-md hover:bg-amber-50 transition-all duration-300"
                            >
                                İletişim
                            </Link>
                        </nav>

                        <div className="flex items-center space-x-6">
                            <Link
                                href="/pages/login"
                                className="text-gray-700 hover:text-amber-400 text-sm font-semibold px-3 py-2 rounded-md hover:bg-amber-50 transition-all duration-300"
                            >
                                Giriş Yap
                            </Link>
                            <Link
                                href="/pages/signup"
                                className="bg-amber-400 hover:bg-amber-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 ring-1 ring-transparent hover:ring-amber-300"
                            >
                                Ücretsiz Kaydol
                            </Link>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-amber-400 hover:bg-amber-50 focus:outline-none transition-all duration-300"
                        >
                            {menuOpen ? (
                                <XMarkIcon className="block h-7 w-7" />
                            ) : (
                                <Bars3Icon className="block h-7 w-7" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`md:hidden ${menuOpen ? 'block animate-fadeIn' : 'hidden'} rounded-b-2xl overflow-hidden transition-all duration-300`}>
                <div className="pt-4 pb-6 space-y-1 bg-white shadow-xl">
                    <Link
                        href="/pages/qrcodegenerator"
                        className="block px-6 py-3 text-base font-semibold text-gray-700 hover:text-amber-400 hover:bg-amber-50 transition-all duration-300"
                        onClick={closeMenu}
                    >
                        QR Kod Oluşturucu
                    </Link>
                    <Link
                        href="/pages/about"
                        className="block px-6 py-3 text-base font-semibold text-gray-700 hover:text-amber-400 hover:bg-amber-50 transition-all duration-300"
                        onClick={closeMenu}
                    >
                        Hakkımızda
                    </Link>
                    <Link
                        href="/pages/contact"
                        className="block px-6 py-3 text-base font-semibold text-gray-700 hover:text-amber-400 hover:bg-amber-50 transition-all duration-300"
                        onClick={closeMenu}
                    >
                        İletişim
                    </Link>

                    <div className="border-t border-gray-200 pt-4 pb-2">
                        <div className="space-y-2 px-6">
                            <Link
                                href="/pages/login"
                                className="block text-center px-4 py-3 rounded-md text-base font-semibold text-gray-700 hover:text-amber-400 hover:bg-amber-50 transition-all duration-300"
                                onClick={closeMenu}
                            >
                                Giriş Yap
                            </Link>
                            <Link
                                href="/pages/signup"
                                className="block w-full text-center px-4 py-3 rounded-lg bg-amber-400 text-white font-semibold hover:bg-amber-500 shadow-md hover:shadow-lg transition-all duration-300"
                                onClick={closeMenu}
                            >
                                Ücretsiz Kaydol
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}