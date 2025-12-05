"use client";

import React, { useState } from 'react';
import { ShoppingCart, Package, User, LogIn, Lock, Menu, X, Phone } from 'lucide-react';

// --- ÖRNEK VERİLER (Veritabanı bağlanana kadar görüntü olsun diye) ---
const MOCK_PRODUCTS = [
  { id: 1, name: "Endüstriyel Matkap Seti", code: "MAT-2024", price: 4500, stock: 50, image: "https://placehold.co/400x300?text=Matkap" },
  { id: 2, name: "İş Güvenliği Bareti (Koli: 20)", code: "BARET-XP", price: 2000, stock: 120, image: "https://placehold.co/400x300?text=Baret" },
  { id: 3, name: "Hidrolik Pompa Ünitesi", code: "POM-500", price: 12500, stock: 15, image: "https://placehold.co/400x300?text=Pompa" },
  { id: 4, name: "Çelik Halat 100m", code: "HAL-100", price: 3200, stock: 40, image: "https://placehold.co/400x300?text=Halat" },
  { id: 5, name: "Profesyonel Takım Çantası", code: "CANT-PRO", price: 1500, stock: 60, image: "https://placehold.co/400x300?text=Canta" },
  { id: 6, name: "Kaynak Makinesi v2", code: "KAY-200", price: 8500, stock: 8, image: "https://placehold.co/400x300?text=Kaynak" },
];

export default function HomePage() {
  const [user, setUser] = useState(null); // null = Misafir, { name: ... } = Giriş yapmış
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [cart, setCart] = useState([]);

  // Sepete Ekleme
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} sepete eklendi!`);
  };

  // Basit Giriş Simülasyonu
  const handleLogin = (e) => {
    e.preventDefault();
    setUser({ name: "Ahmet Bayi", role: "Bayi" });
    setIsLoginOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Package size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 leading-none">SERVESEL GIDA</h1>
              <span className="text-xs text-slate-500">Kurumsal Tedarik Portalı</span>
            </div>
          </div>

          {/* Menü & Giriş */}
          <div className="flex items-center gap-4">
            {user ? (
              // GİRİŞ YAPILMIŞ HALİ
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                  <p className="text-xs text-green-600">Aktif Bayi Hesabı</p>
                </div>
                <button className="relative p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
                  <ShoppingCart size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>
                <button onClick={() => setUser(null)} className="text-sm text-red-500 hover:underline">Çıkış</button>
              </div>
            ) : (
              // GİRİŞ YAPILMAMIŞ (MİSAFİR) HALİ
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
              >
                <LogIn size={18} />
                <span className="font-medium">Bayi Girişi</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* --- ANA VİTRİN --- */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Banner Alanı */}
        <div className="bg-slate-900 rounded-2xl p-8 mb-10 text-white flex flex-col md:flex-row items-center justify-between shadow-xl">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Toptan Gıda & Tedarik Çözümleri</h2>
            <p className="text-slate-300">İşletmeniz için en uygun fiyatlar ve geniş ürün yelpazesi.</p>
          </div>
          {!user && (
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
              <p className="text-sm flex items-center gap-2 mb-1">
                <Lock size={14} className="text-yellow-400" />
                Fiyatları görmek için bayi girişi yapmalısınız.
              </p>
            </div>
          )}
        </div>

        {/* Ürün Listesi */}
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Package className="text-blue-600" />
          Öne Çıkan Ürünler
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition group">
              {/* Ürün Resmi */}
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                {!user && (
                   <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                     <span className="bg-black/70 text-white text-xs px-3 py-1 rounded-full">Giriş Gerekli</span>
                   </div>
                )}
              </div>

              {/* Ürün Bilgileri */}
              <div className="p-5">
                <p className="text-xs text-slate-500 mb-1">{product.code}</p>
                <h4 className="font-bold text-slate-800 text-lg mb-3 line-clamp-2 h-14">{product.name}</h4>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  {user ? (
                    // Giriş Yapan Fiyatı Görür
                    <>
                      <div>
                        <p className="text-xs text-slate-400">Bayi Fiyatı</p>
                        <p className="text-xl font-bold text-blue-600">{product.price.toLocaleString('tr-TR')} ₺</p>
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </>
                  ) : (
                    // Misafir Fiyatı Göremez
                    <div className="w-full bg-slate-100 p-2 rounded text-center">
                      <p className="text-slate-500 font-bold text-lg tracking-widest">*** ₺</p>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Fiyat Gizli</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- GİRİŞ MODAL (POPUP) --- */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
            <button 
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <User size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Bayi Girişi</h2>
              <p className="text-slate-500">Lütfen bayi bilgilerinizi giriniz.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-Posta Adresi</label>
                <input type="email" placeholder="ornek@sirket.com" className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Şifre</label>
                <input type="password" placeholder="••••••••" className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" required />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                Giriş Yap
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              <p>Bayi hesabınız yok mu?</p>
              <a href="#" className="text-blue-600 font-medium hover:underline">Başvuru Formu Doldur</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}