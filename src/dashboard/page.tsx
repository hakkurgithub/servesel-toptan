import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { createClient } from "@supabase/supabase-js";
import LogoutButton from "./LogoutButton";

// Tek bir Supabase connection-pool
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  // Ürün + kategori çek (aynı Prisma sorgusu gibi)
  const { data: products } = await supabase
    .from("Product")
    .select(`*, category:Category(name)`)
    .order("id", { ascending: false });

  const totalStock = (products || []).reduce((acc: number, p: any) => acc + p.stock, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800/70 backdrop-blur border-b border-gray-700 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Servesel Gıda Paneli
          </h1>
          <p className="text-sm text-gray-400">
            Hoş geldin, <span className="font-semibold text-blue-300">{session.user?.email}</span>
          </p>
        </div>
        <LogoutButton />
      </header>

      <main className="p-8 max-w-7xl mx-auto">
        {/* İstatistik Kartları */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card label="Toplam Ürün" value={products?.length || 0} color="blue" />
          <Card label="Toplam Stok" value={totalStock} color="green" />
          <Card label="Bekleyen Sipariş" value={0} color="yellow" />
        </section>

        {/* Şık Tablo */}
        <div className="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-700">
            <h2 className="text-lg font-semibold">Ürün Listesi</h2>
            <span className="text-xs font-medium bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
              {products?.length || 0} Kayıt
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-900 text-gray-400 uppercase tracking-wider text-xs">
                <tr>
                  {["Ürün Adı", "Kategori", "Fiyat", "Stok", "Durum"].map(h => (
                    <th key={h} className="px-6 py-3 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {products && products.length > 0 ? (
                  products.map((p: any, i: number) => (
                    <tr key={p.id} className={`hover:bg-gray-700/50 transition ${i % 2 ? "bg-gray-800" : "bg-gray-900"}`}>
                      <td className="px-6 py-4 font-medium text-white">{p.name}</td>
                      <td className="px-6 py-4 text-gray-400">{p.category?.name || "-"}</td>
                      <td className="px-6 py-4 text-white font-semibold">{p.price} ₺</td>
                      <td className="px-6 py-4 text-gray-300">{p.stock} Adet</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.stock > 10 ? "bg-green-500/10 text-green-300" : "bg-rose-500/10 text-rose-300"}`}>
                          {p.stock > 10 ? "Stokta Var" : "Kritik Stok"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Henüz ürün yok.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

/* -------- Bileşenler -------- */
function Card({ label, value, color }: { label: string; value: number; color: "blue" | "green" | "yellow" }) {
  const colors = {
    blue: "from-blue-500 to-cyan-400 border-blue-500",
    green: "from-green-500 to-emerald-400 border-green-500",
    yellow: "from-yellow-500 to-amber-400 border-yellow-500",
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} bg-opacity-10 border-l-4 ${colors[color]} rounded-xl p-6 shadow-lg`}>
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">{label}</h3>
      <p className="text-4xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}