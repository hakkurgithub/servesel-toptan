import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 font-sans p-6">
      
      {/* --- Orta Kart Alanı --- */}
      <main className="max-w-4xl w-full text-center space-y-8 bg-white p-12 rounded-2xl shadow-xl border border-gray-100">
        
        {/* Başlık ve Logo Alanı */}
        <div className="space-y-4">
          <div className="text-6xl mb-4">🍽️</div>
          <h1 className="text-5xl font-extrabold text-blue-900 tracking-tight">
            Servesel Gıda
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Gıda tedarik zincirinde güven, hız ve kalitenin buluşma noktası.
            B2B siparişlerinizi yönetmek için panele giriş yapın.
          </p>
        </div>

        {/* --- Butonlar --- */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/api/auth/signin"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition-all transform hover:scale-105 shadow-md no-underline"
          >
            Giriş Yap
          </Link>
          
          {/* Kayıt ol butonu şimdilik pasif */}
          <button 
            disabled 
            className="px-8 py-4 bg-gray-100 text-gray-400 text-lg font-semibold rounded-lg cursor-not-allowed border border-gray-200"
          >
            Kayıt Ol (Yakında)
          </button>
        </div>

        {/* --- Alt Bilgi --- */}
        <div className="pt-8 border-t border-gray-100 mt-8">
          <p className="text-sm text-gray-400">
            &copy; 2024 Servesel Gıda B2B Platformu. Tüm hakları saklıdır.
          </p>
        </div>
      </main>
    </div>
  );
}