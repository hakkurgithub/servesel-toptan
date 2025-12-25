import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      
      {/* Hero (Karşılama) Bölümü */}
      <section className="relative w-full h-[500px] bg-gray-900 text-white flex items-center justify-center">
        {/* Arka plan görseli yerine koyu renk kullandık, istersen resim ekleyebilirsin */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Toptan Gıda Tedariğinde <br /> 
            <span className="text-blue-400">Güvenilir Çözüm Ortağınız</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            İşletmeniz için en taze ürünler, en uygun fiyatlarla kapınızda. 
            Restoran, kafe ve marketler için özel B2B hizmeti.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/menu" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
            >
              Ürünleri İncele
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-8 rounded-full transition-all"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </section>

      {/* Avantajlar Bölümü */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Neden Servesel Tedarik?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kart 1 */}
          <div className="p-6 bg-gray-50 rounded-xl text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Hızlı Teslimat</h3>
            <p className="text-gray-600">Siparişleriniz kendi araçlarımızla en kısa sürede kapınıza teslim edilir.</p>
          </div>

          {/* Kart 2 */}
          <div className="p-6 bg-gray-50 rounded-xl text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Rekabetçi Fiyatlar</h3>
            <p className="text-gray-600">Toptan alımlarda piyasadaki en iyi fiyat garantisini sunuyoruz.</p>
          </div>

          {/* Kart 3 */}
          <div className="p-6 bg-gray-50 rounded-xl text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Kalite Garantisi</h3>
            <p className="text-gray-600">Tüm ürünlerimiz kalite kontrol süreçlerinden geçerek size ulaşır.</p>
          </div>
        </div>
      </section>

    </main>
  );
}