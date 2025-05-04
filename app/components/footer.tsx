"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Logo ve Açıklama */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <Link href={"/public"}>
                            <Image
                                src="/kısaltl.ınk.png"
                                alt="Logo"
                                width={180}
                                height={60}
                                className="w-auto rounded-lg"
                            />
                            </Link>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Kısaltl.ınk ile linklerinizi profesyonelce yönetin, takip edin ve optimize edin.
                        </p>
                    </div>

                    {/* Ürünler */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Ürünler</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/public" className="text-gray-600 hover:text-amber-500 text-sm transition-colors duration-300">
                                    Link Kısaltma
                                </Link>
                            </li>
                            <li>
                                <Link href="/pages/qrcodegenerator" className="text-gray-600 hover:text-amber-500 text-sm transition-colors duration-300">
                                    QR Kod Oluşturucu
                                </Link>
                            </li>
                            <li>
                                <Link href="/pages/login" className="text-gray-600 hover:text-amber-500 text-sm transition-colors duration-300">
                                    Giriş yap
                                </Link>
                            </li>
                            <li>
                                <Link href="/pages/signup" className="text-gray-600 hover:text-amber-500 text-sm transition-colors duration-300">
                                    Kayıt Ol
                                </Link>
                            </li>
                        </ul>
                    </div>


                    {/* Şirket */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Şirket</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/pages/about" className="text-gray-600 hover:text-amber-500 text-sm transition-colors duration-300">
                                    Hakkımızda
                                </Link>
                            </li>

                            <li>
                                <Link href="/pages/contact" className="text-gray-600 hover:text-amber-500 text-sm transition-colors duration-300">
                                    İletişim
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Alt Kısım */}
                <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Kısaltl.ınk. Tüm hakları saklıdır. Powered By MUHAMMED MUSTAFA KURT
                    </p>
                </div>
            </div>
        </footer>
    );
}