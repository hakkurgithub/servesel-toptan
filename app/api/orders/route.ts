import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Oturum açmalısınız." }, { status: 401 });
    }

    const body = await req.json();
    const { items, total, paymentMethod } = body; // Ödeme yöntemi buradan geliyor

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "Kullanıcı bulunamadı." }, { status: 404 });

    // 1. Siparişi Kaydet
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: parseFloat(total),
        status: "Ödeme Bekleniyor", 
        paymentMethod: paymentMethod, // Veritabanına kaydet
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: parseFloat(item.price)
          }))
        }
      },
      include: { items: { include: { product: true } } } // Ürün isimlerini çek
    });

    // 2. Bildirim Metni Hazırla
    const urunListesi = order.items.map(i => `- ${i.product.name} (${i.quantity} Adet)`).join("\n");
    
    const mesajMetni = `
    📦 YENİ SİPARİŞ VAR! (No: #${order.id})
    👤 Müşteri: ${user.company || user.name}
    📞 Telefon: ${user.phone || "Yok"}
    💰 Tutar: ${total} ₺
    💳 Ödeme: ${paymentMethod}
    
    🛒 Ürünler:
    ${urunListesi}
    `;

    // 3. Email Gönder (Admin'e)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: 'kurt.hakki@gmail.com', // SENİN MAİL ADRESİN
                subject: `Yeni Sipariş: #${order.id} - ${user.company}`,
                text: mesajMetni,
            });
            console.log("Email gönderildi.");
        } catch (e) {
            console.error("Email hatası:", e);
        }
    }

    return NextResponse.json({ success: true, orderId: order.id });

  } catch (error: any) {
    console.error("Sipariş Hatası:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}