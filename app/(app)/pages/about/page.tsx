import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="bg-blue-400 min-h-screen flex items-center justify-center px-4 py-16 text-gray-900 font-sans">
            <div className="max-w-4xl w-full">
                <div className="bg-white rounded-2xl shadow-2xl p-10 animate-fade-in border border-gray-100">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800 animate-slide-up">
                        Hakkımızda
                    </h1>
                    <div className="mt-12 animate-fade-in delay-300">
                        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Geliştirici Hakkında</h2>
                        <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100">
                            <p className="text-gray-800 text-lg leading-relaxed">
                                Merhaba! Ben Muhammed Mustafa Kurt bu sitenin sahibi ve geliştiricisiyim. Yazılım
                                geliştirme tutkumu,
                                insanların dijital araçlara daha kolay
                                erişmesini sağlamak için kullanıyorum. Bu platformu, hem bireyler hem de işletmeler için
                                basit, güvenli, işlevsel ve ücretsiz
                                bir QR kod aracı sunmak amacıyla tasarladım.
                            </p>
                            <p className="mt-4 text-gray-600 italic">
                                Kullanıcı deneyimini sürekli iyileştirmek için çalışıyorum. Her geri bildirim benim için
                                çok değerli!
                            </p>
                        </div>
                    </div>
                    <br/>
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">Site Hakkında</h2>
                    <p className="text-lg sm:text-xl text-gray-700 leading-relaxed animate-fade-in delay-100">
                        Link kısaltma ve QR Kod oluşturmayı hiç bu kadar kolay ve hızlı deneyimlemediniz! Platformumuz
                        sayesinde
                        saniyeler içinde özel QR kodlar ve kısaltılmış linkler
                        oluşturabilir, bağlantılarınızı kolayca paylaşabilirsiniz.
                        Hız, güvenlik ve kullanıcı dostu arayüzüyle öne çıkan sitemiz hem bireysel hem de kurumsal
                        kullanıcılar için idealdir.
                    </p>

                    <div className="mt-12 animate-fade-in delay-300">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-100">
                            <p className="text-gray-800 text-lg leading-relaxed">
                                Muhammed Mustafa Kurt
                            </p>
                            <p className="mt-4 text-gray-600 italic">
                                Full stack web developer
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center animate-fade-in delay-500">
                        <p className="text-gray-600 text-md mb-2">Fikrin mi var? Birlikte geliştirebiliriz!</p>
                        <Link href={"/pages/contact"}>
                            <button
                                className="text-white cursor-pointer bg-gray-600 hover:bg-gray-500 font-semibold py-2 px-6 rounded-full transition-colors duration-300 shadow-md">
                                İletişime Geç
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}