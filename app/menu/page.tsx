import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

// BU SATIR ÇOK ÖNEMLİ: Sayfanın her saniye güncel kalmasını sağlar (Canlı Yayın Modu)
export const dynamic = "force-dynamic"; 
export const revalidate = 0;

export default async function MenuPage() {
  // Ürünleri veritabanından çek (En yeniden eskiye)
  const products = await prisma.product.findMany({
    where: { isActive: true }, // Sadece AKTİF ürünleri göster
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-slate-800">Toptan Ürünlerimiz</h1>
      
      {products.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">Henüz ürün eklenmemiş.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
              
              {/* RESİM ALANI */}
              <div className="h-48 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    // Resim yüklenmezse hata vermesin diye basit img etiketi kullandık
                  /> 
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                     <span>Resim Yok</span>
                  </div>
                )}
              </div>

              {/* ÜRÜN BİLGİLERİ */}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="font-bold text-lg text-slate-800 mb-1">{product.name}</h2>
                <p className="text-sm text-gray-500 mb-4 flex-1">
                  {product.description || "Açıklama yok."}
                </p>
                
                <div className="mt-auto">
                  <div className="text-center mb-3">
                    <span className="text-2xl font-bold text-green-600">
                      {product.price} ₺
                    </span>
                  </div>
                  
                  {/* SEPET BUTONU */}
                  <button 
                    // Sepete ekleme mantığı buraya bağlanacak (Context veya LocalStorage)
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    Sepete Ekle <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}