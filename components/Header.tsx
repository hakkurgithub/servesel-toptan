"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, User, LogIn, LogOut, LayoutDashboard, Menu } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession(); // Kullanıcı giriş yapmış mı?
  const { cartCount } = useCart(); // Sepet sayısı
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link href="/" className="text-2xl font-bold text-blue-900 flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">S</div>
          <span>Servesel<span className="text-blue-600">Tedarik</span></span>
        </Link>

        {/* 2. MENÜ (Masaüstü) */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Ana Sayfa</Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium">İletişim</Link>
          
          {/* Sepet Butonu */}
          <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* --- GİRİŞ KONTROL ALANI --- */}
          {session ? (
            // EĞER GİRİŞ YAPMIŞSA BU GÖRÜNÜR:
            <div className="flex items-center gap-4 border-l pl-6 ml-2">
              <div className="text-right hidden lg:block">
                <div className="text-sm font-bold text-gray-900">{session.user?.name}</div>
                <div className="text-xs text-gray-500">{session.user?.email}</div>
              </div>

              {/* Admin ise Yönetim Paneli Butonu */}
              {session.user?.role === "ADMIN" && (
                <Link href="/admin" className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg" title="Yönetici Paneli">
                  <LayoutDashboard size={22} />
                </Link>
              )}

              {/* Müşteri Paneli (Dashboard) */}
              <Link href="/dashboard" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Siparişlerim">
                <User size={22} />
              </Link>

              {/* Çıkış Yap Butonu */}
              <button 
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg" 
                title="Çıkış Yap"
              >
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            // EĞER GİRİŞ YAPMAMIŞSA BU GÖRÜNÜR:
            <div className="flex items-center gap-3 border-l pl-6 ml-2">
              <Link 
                href="/login" 
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-bold transition"
              >
                <LogIn size={18} />
                Giriş Yap
              </Link>
              <Link 
                href="/register" 
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition shadow-md hover:shadow-lg"
              >
                Bayi Ol
              </Link>
            </div>
          )}
        </div>

        {/* MOBİL MENÜ BUTONU */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-700">
          <Menu size={28} />
        </button>
      </div>

      {/* MOBİL MENÜ AÇILIRSA */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white p-4 space-y-4">
           {session ? (
             <>
               <div className="p-3 bg-blue-50 rounded-lg">
                 <div className="font-bold">{session.user?.name}</div>
                 <div className="text-sm text-gray-500">{session.user?.email}</div>
               </div>
               <Link href="/dashboard" className="block py-2 text-blue-600 font-bold">Hesabım / Siparişlerim</Link>
               {session.user?.role === "ADMIN" && <Link href="/admin" className="block py-2 text-purple-600 font-bold">Yönetici Paneli</Link>}
               <button onClick={() => signOut()} className="block w-full text-left py-2 text-red-600 font-bold">Çıkış Yap</button>
             </>
           ) : (
             <div className="grid grid-cols-2 gap-3">
               <Link href="/login" className="text-center py-3 border rounded-lg font-bold">Giriş Yap</Link>
               <Link href="/register" className="text-center py-3 bg-blue-600 text-white rounded-lg font-bold">Bayi Ol</Link>
             </div>
           )}
        </div>
      )}
    </header>
  );
}