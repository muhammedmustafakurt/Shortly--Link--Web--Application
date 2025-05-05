"use client";
import { useState } from "react";
import ShortenForm from "@/app/components/shortenForm";
import Popup from "@/app/components/Popup";
import Link from "next/link";
export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  return (
      <div className="min-h-screen bg-blue-400 text-lime-300 flex items-center justify-center -mt-12 p-6">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <main>
            <ShortenForm/>
          </main>
          <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
            <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-500 mb-3 sm:mb-4">
                Hakkında
              </h2>

              <div className="space-y-4 sm:space-y-5 text-gray-700">
                <p className="text-sm sm:text-base leading-relaxed sm:leading-loose">
                  <strong>kisaltl.ink</strong>, tamamen açık kaynak kodlu ve ticari amaç gütmeyen bir projedir.
                  Eğitim ve öğrenme odaklı olarak geliştirilmiştir ve sadece yazılım geliştirme pratiği sunmayı hedefler.
                </p>

                <p className="text-sm sm:text-base leading-relaxed sm:leading-loose">
                  Platform, kullanıcıların URL kısaltma sistemlerinin nasıl çalıştığını anlamalarına yardımcı olur.
                  Herhangi bir ticari gelir elde edilmemekte olup, tüm işlemler test ve eğitim amaçlıdır.
                </p>

                <p className="text-sm sm:text-base leading-relaxed sm:leading-loose">
                  Oluşturduğunuz kısa linklerin izlenme istatistiklerini görebilmek için giriş yapmanız gerekmektedir.
                  Giriş yaptıktan sonra dashboard üzerinden tüm linklerinizin performansını takip edebilirsiniz.
                </p>

                <p className="text-sm sm:text-base leading-relaxed sm:leading-loose">
                  Projenin kaynak kodları açık bir şekilde paylaşılmıştır ve dileyen herkes kendi projelerinde kullanabilir.
                </p>

                <p className="text-sm sm:text-base leading-relaxed sm:leading-loose">
                  Geliştirici: <strong>Muhammed Mustafa Kurt</strong> – Full Stack Web Developer
                </p>

                <p className="text-sm sm:text-base leading-relaxed sm:leading-loose">
                  Github:{" "}
                  <Link
                      href="https://github.com/muhammedmustafakurt"
                      className="text-blue-400 hover:text-blue-600 transition-colors duration-200 break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    <strong>github.com/muhammedmustafakurt</strong>
                  </Link>
                </p>
              </div>
            </div>
          </Popup>



          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="bg-white text-blue-900 p-4 rounded-md shadow-lg w-full text-center animate-pulse">
              <p className="text-sm">Orijinal Link:</p>
              <p className="font-bold truncate">https://www.cokuzunbirinternetadresi.com/cok/uzun/yol</p>
            </div>

            <div className="text-3xl font-extrabold text-amber-300 animate-bounce">↓</div>

            <div className="bg-amber-400 text-white p-4 rounded-md shadow-lg w-full text-center">
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
