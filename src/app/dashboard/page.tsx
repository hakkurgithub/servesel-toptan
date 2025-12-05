import { getServerSession } from "next-auth";
// HATA VEREN SATIR DEĞİŞTİ: Artık lib/auth dosyasından çekiyoruz
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Bayi Paneli</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-lg">Hoşgeldiniz, <span className="font-bold">{session.user?.email}</span></p>
        <p className="text-slate-500 mt-2">Rolünüz: {session.user?.role || "Tanımsız"}</p>
        <p className="mt-4 text-sm text-blue-600">Burada sipariş geçmişi ve özel fiyatlar yer alacak.</p>
      </div>
    </div>
  );
}