"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ArrowLeft, CheckCircle, CreditCard, Banknote } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Ödeme Yöntemi Seçimi
  const [paymentMethod, setPaymentMethod] = useState("Havale/EFT");

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const increaseQty = (id: string) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQty = (id: string) => {
    setCart(cart.map(item => {
      if (item.id === id) return item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item;
      return item;
    }));
  };

  const removeItem = (id: string) => {
    if (confirm("Silmek istiyor musunuz?")) setCart(cart.filter(item => item.id !== id));
  };

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const completeOrder = async () => {
    if (cart.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            items: cart, 
            total: totalAmount,
            paymentMethod: paymentMethod // Seçilen ödeme yöntemini gönder
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // BAŞARILI MESAJI VE YÖNLENDİRME
        alert(`✅ Sipariş Alındı! \n\nLütfen ödemeyi aşağıdaki IBAN'a yapınız.\nSipariş No: #${data.orderId}`);
        setCart([]);
        localStorage.removeItem("cart");
        router.push("/dashboard");
      } else {
        alert("❌ Hata: " + data.error);
      }
    } catch (error) {
      alert("Bir bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => router.push("/dashboard")} className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                <ArrowLeft size={20} className="text-gray-600"/>
            </button>
            <h1 className="text-3xl font-bold text-slate-800">Sepetim</h1>
        </div>

        {cart.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
              <p className="text-gray-400 text-xl mb-4">Sepetiniz boş.</p>
              <button onClick={() => router.push("/dashboard")} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Alışverişe Dön</button>
           </div>
        ) : (
           <div className="flex flex-col lg:flex-row gap-8">
              
              {/* SOL: Ürün Listesi */}
              <div className="flex-1 space-y-4">
                 {cart.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            {item.image && <img src={item.image} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.price} ₺</p>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
                            <button onClick={() => decreaseQty(item.id)} className="p-1 hover:bg-white rounded"><Minus size={14} /></button>
                            <span className="font-bold w-6 text-center">{item.quantity}</span>
                            <button onClick={() => increaseQty(item.id)} className="p-1 hover:bg-white rounded"><Plus size={14} /></button>
                        </div>
                        <div className="font-bold w-20 text-right">{(item.price * item.quantity).toLocaleString("tr-TR")} ₺</div>
                        <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                    </div>
                 ))}
              </div>

              {/* SAĞ: Ödeme ve Özet */}
              <div className="lg:w-96 space-y-6">
                  
                  {/* ÖDEME YÖNTEMİ SEÇİMİ */}
                  <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                      <h3 className="text-lg font-bold mb-4">Ödeme Yöntemi</h3>
                      
                      <div className="space-y-3">
                          <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'Havale/EFT' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'hover:bg-gray-50'}`}>
                              <input type="radio" name="payment" value="Havale/EFT" checked={paymentMethod === 'Havale/EFT'} onChange={(e) => setPaymentMethod(e.target.value)} />
                              <Banknote className="text-blue-600"/>
                              <div>
                                  <div className="font-bold text-sm">Havale / EFT</div>
                                  <div className="text-xs text-gray-500">%0 Komisyon</div>
                              </div>
                          </label>

                          <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'Kapıda Ödeme' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'hover:bg-gray-50'}`}>
                              <input type="radio" name="payment" value="Kapıda Ödeme" checked={paymentMethod === 'Kapıda Ödeme'} onChange={(e) => setPaymentMethod(e.target.value)} />
                              <CreditCard className="text-green-600"/>
                              <div>
                                  <div className="font-bold text-sm">Kapıda Ödeme</div>
                                  <div className="text-xs text-gray-500">Nakit veya Kredi Kartı</div>
                              </div>
                          </label>
                      </div>

                      {/* IBAN KUTUSU (Sadece Havale seçiliyse görünür) */}
                      {paymentMethod === 'Havale/EFT' && (
                          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                              <p className="font-bold mb-1">🏦 Banka Bilgileri:</p>
                              <p>TR12 0006 1000 0000 0000 1234 56</p>
                              <p className="font-bold mt-1">Alıcı: Servesel Tedarik A.Ş.</p>
                              <p className="text-xs mt-2 text-gray-600">*Açıklamaya sipariş numaranızı yazınız.</p>
                          </div>
                      )}
                  </div>

                  {/* ÖZET VE ONAY */}
                  <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                      <div className="flex justify-between text-2xl font-bold text-slate-800 mb-6">
                          <span>Toplam</span>
                          <span>{totalAmount.toLocaleString("tr-TR")} ₺</span>
                      </div>

                      <button 
                        onClick={completeOrder} 
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? "İşleniyor..." : <><CheckCircle size={20} /> Siparişi Onayla</>}
                      </button>
                  </div>
              </div>

           </div>
        )}
      </div>
    </div>
  );
}