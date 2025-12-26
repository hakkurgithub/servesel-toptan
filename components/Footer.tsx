import { Package, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center gap-2 mb-4 text-white">
          <Package size={24} />
          <span className="text-xl font-bold">SERVESEL TEDARİK</span>
        </div>
        <p className="text-sm text-slate-400 mb-4">Güvenilir tedarikçiniz.</p>
        <div className="flex justify-center gap-4 text-sm font-bold text-white">
            <Link href="/">Ana Sayfa</Link>
            <Link href="/dashboard">Bayi Paneli</Link>
        </div>
        <div className="mt-8 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Servesel Tedarik A.Ş.
        </div>
      </div>
    </footer>
  );
}