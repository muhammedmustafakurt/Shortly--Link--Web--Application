export default function ContactPage() {
    return (
        <div className="bg-blue-400 min-h-screen flex items-center justify-center px-4 py-16 text-white font-sans">
            <div className="max-w-3xl w-full">
                <div className="bg-white rounded-2xl shadow-2xl p-10 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-700 animate-slide-up">
                        İletişim
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8 animate-fade-in delay-100">
                        Aşağıdaki iletişim bilgilerinden bana ulaşabilirsiniz. Her türlü öneri, iş birliği veya teknik destek talepleriniz için çekinmeden iletişime geçebilirsiniz.
                    </p>

                    <div className="space-y-6 text-gray-400 text-lg animate-fade-in delay-200">
                        <div>
                            <span className="text-gray-400 font-semibold">Ad:</span> Muhammed Mustafa Kurt
                        </div>
                        <div>
                            <span className="text-gray-400 font-semibold">E-posta:</span> muhammedmustafakurtofc@gmail.com
                        </div>
                        <div>
                            <span className="text-gray-400 font-semibold">GitHub:</span>{' '}
                            <a
                                href="https://github.com/muhammedmustafakurt"
                                className="text-gray-400 underline hover:text-gray-500 transition-colors duration-200"
                                target="_blank"
                            >
                                github.com/muhammedmustafakurt
                            </a>
                        </div>
                        <div>
                            <span className="text-gray-400 font-semibold">LinkedIn:</span>{' '}
                            <a
                                href="https://www.linkedin.com/in/muhammed-mustafa-kurt/"
                                className="text-gray-400 underline hover:text-gray-500 transition-colors duration-200"
                                target="_blank"
                            >
                                https://www.linkedin.com/in/muhammed-mustafa-kurt/
                            </a>
                        </div>
                    </div>

                    <div className="mt-12 text-center animate-fade-in delay-300">
                        <p className="text-black mb-2">Teşekkür ederim, geri dönüşlerinizi önemsiyorum!</p>
                        <span className="text-sm text-gray-400 italic">Sitenin sahibi & geliştiricisi</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
