import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer"; 
import Header from "@/components/Header"; // 👈 DÜZELTME: Navbar yerine Header
import { CartProvider } from "@/components/CartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Servesel Tedarik - B2B Tedarik Portalı",
  description: "İşletmeniz için güvenilir toptan gıda tedarikçisi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        
        {/* CartProvider her şeyi kapsar */}
        <CartProvider>
          
          {/* Header (Üst Menü) */}
          <Header /> 

          {/* Sayfa İçeriği */}
          <div className="flex-grow">
            {children}
          </div>

          {/* Footer (Alt Bilgi) */}
          <Footer />

        </CartProvider>
        
      </body>
    </html>
  );
}