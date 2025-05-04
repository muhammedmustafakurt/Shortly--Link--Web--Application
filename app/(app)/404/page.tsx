export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-400">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                <p className="text-xl text-white mb-8">Sayfa bulunamadı</p>
                <a
                    href="/"
                    className="px-6 py-3 bg-white text-black rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Anasayfaya Dön
                </a>
            </div>
        </div>
    )
}