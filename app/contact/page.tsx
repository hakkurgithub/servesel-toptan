"use client";

import { useState } from "react";
// Buton ikonları (MessageCircle eklendi)
import { ExternalLink, Send, MessageCircle } from "lucide-react"; 

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Kendi mail adresiniz ve telefon numaranız
  const myEmail = "kurt.hakki@gmail.com";
  const myPhone = "905333715577"; // Başında + olmadan

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- 1. YÖNTEM: Gmail Web ---
  const handleGmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return alert("Lütfen form alanlarını doldurun.");

    const subject = encodeURIComponent(`Servesel Tedarik İletişim: ${formData.subject}`);
    const body = encodeURIComponent(
      `Gönderen: ${formData.name}\nE-Posta: ${formData.email}\n\nMesaj:\n${formData.message}`
    );

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${body}`;
    window.open(gmailLink, "_blank");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  // --- 2. YÖNTEM: Varsayılan Mail Uygulaması ---
  const handleMailto = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return alert("Lütfen form alanlarını doldurun.");

    const subject = encodeURIComponent(`Servesel Tedarik İletişim: ${formData.subject}`);
    const body = encodeURIComponent(
      `Gönderen: ${formData.name}\nE-Posta: ${formData.email}\n\nMesaj:\n${formData.message}`
    );

    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  // --- 3. YÖNTEM: WhatsApp (YENİ) ---
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    // WhatsApp'ta isim ve mesaj olması yeterli olabilir ama e-posta da ekliyoruz
    if (!formData.name || !formData.message) return alert("Lütfen Ad Soyad ve Mesaj alanlarını doldurun.");

    // WhatsApp mesaj formatı (Yıldızlar kalın yapar)
    const text = `*İletişim Formu Mesajı*\n\n` +
                 `👤 *Ad Soyad:* ${formData.name}\n` +
                 `📧 *E-Posta:* ${formData.email}\n` +
                 `📝 *Konu:* ${formData.subject}\n\n` +
                 `💬 *Mesaj:* ${formData.message}`;

    const wpLink = `https://wa.me/${myPhone}?text=${encodeURIComponent(text)}`;
    window.open(wpLink, "_blank");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">İletişim</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sorularınız, toptan sipariş talepleriniz veya iş birliği önerileriniz için bizimle iletişime geçin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* SOL TARAF: İletişim Bilgileri */}
        <div className="space-y-8">
          <div className="bg-green-50 border border-green-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
              </svg>
              WhatsApp Hattı
            </h3>
            <p className="text-green-700 mb-6">
              Hızlı sipariş vermek veya destek almak için WhatsApp hattımızdan bize 7/24 yazabilirsiniz.
            </p>
            <a href={`https://wa.me/${myPhone}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-colors text-lg">
              +90 533 371 55 77
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
             <div className="space-y-6">
               <div className="flex items-start gap-4">
                 <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-800">Adresimiz</h4>
                   <p className="text-gray-600 text-sm">Organize Sanayi Bölgesi, 12. Cadde No:5<br/>İstanbul, Türkiye</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-800">E-Posta</h4>
                   <p className="text-gray-600 text-sm">{myEmail}</p>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* SAĞ TARAF: Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Bize Mesaj Gönderin</h3>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Adınız Soyadınız</label>
              <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Örn: Ahmet Yılmaz" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Posta Adresiniz</label>
              <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ornek@sirket.com" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Konu</label>
              <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Örn: Toptan Sipariş" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mesajınız</label>
              <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Mesajınız..."></textarea>
            </div>
            
            {/* BUTON ALANI (3 SEÇENEK) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <button 
                onClick={handleGmail}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors"
              >
                <ExternalLink size={20} />
                Gmail ile Gönder
              </button>

              <button 
                onClick={handleMailto}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors"
              >
                <Send size={20} />
                Uygulama ile Gönder
              </button>
              
              {/* WhatsApp Butonu (Tam Genişlik) */}
              <button 
                onClick={handleWhatsApp}
                className="md:col-span-2 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors mt-2"
              >
                <MessageCircle size={22} />
                Formu WhatsApp ile Gönder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}