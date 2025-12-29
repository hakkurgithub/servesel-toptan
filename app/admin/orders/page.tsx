"use client";
import { useEffect, useState } from "react";
import { Trash2, AlertCircle } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Verileri Çek
  const fetchOrders = async () => {
    const res = await fetch("/api/admin/orders");
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
    }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  // Sipariş Silme Fonksiyonu
  const handleDelete = async (id: string) => {
    if (!confirm("Bu siparişi silmek istediğine emin misin? Cirodan düşülecek.")) return;
    
    const res = await fetch(`/api/admin/orders?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Sipariş silindi.");
      fetchOrders(); // Listeyi yenile
    }
  };

  // Tümünü Silme
  const handleDeleteAll = async () => {
    const onay = prompt("TÜM siparişleri silip Ciroyu SIFIRLAMAK üzeresin. Onaylıyorsan 'EVET' yaz.");
    if (onay !== "EVET") return;

    const res = await fetch(`/api/admin/orders?id=all`, { method: "DELETE" });
    if (res.ok) {
      alert("Sistem temizlendi.");
      fetchOrders();
    }
  };

  if (loading) return <div className="p-10">Yükleniyor...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">📦 Sipariş Yönetimi</h1>
        <button 
          onClick={handleDeleteAll}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm font-bold shadow-md"
        >
          🚨 TÜMÜNÜ SİL & CİROYU SIFIRLA
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-xl">Henüz hiç sipariş yok.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
              
              {/* Silme Butonu */}
              <button 
                onClick={() => handleDelete(order.id)}
                className="absolute top-4 right-4 text-gray-300 hover:text-red-600 transition-colors p-2"
                title="Siparişi Sil"
              >
                <Trash2 size={20} />
              </button>

              <div className="flex flex-col md:flex-row justify-between mb-4 border-b pb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    {order.user?.company || order.user?.email}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString("tr-TR")}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <span className="block text-2xl font-bold text-blue-600">
                    {order.total.toLocaleString("tr-TR")} ₺
                  </span>
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium mt-1">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Ürünler */}
              <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center border-b border-gray-200 last:border-0 pb-2 last:pb-0">
                    <span className="font-medium text-gray-700">
                      {item.quantity} x {item.product?.name}
                    </span>
                    <span className="text-gray-500">
                      {(item.price * item.quantity).toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}