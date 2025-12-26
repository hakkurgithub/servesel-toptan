import { NextResponse } from "next/server";
import { prisma } from "@/lib/auth";

export async function GET() {
  try {
    // Kategori kontrolü
    let category = await prisma.category.findFirst({ where: { slug: "gida" } });
    if (!category) {
      category = await prisma.category.create({
        data: { name: "Temel Tedarik", slug: "gida" },
      });
    }

    // Sahte ürünler
    const products = [
      { name: "Ayçiçek Yağı 18L", price: 650, stock: 100, image: "https://placehold.co/400?text=Yag" },
      { name: "Pirinç 25kg", price: 900, stock: 50, image: "https://placehold.co/400?text=Pirinc" },
      { name: "Toz Şeker 50kg", price: 1200, stock: 200, image: "https://placehold.co/400?text=Seker" },
    ];

    // Admin/Satıcı kontrolü
    let seller = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    if (!seller) {
        seller = await prisma.user.findFirst();
    }

    if (!seller) {
        return NextResponse.json({ error: "Önce en az bir kullanıcı kaydı yapmalısınız!" }, { status: 400 });
    }

    // Ürünleri ekle
    for (const p of products) {
      const exists = await prisma.product.findFirst({ where: { name: p.name } });
      if (!exists) {
        await prisma.product.create({
          data: {
            name: p.name,
            slug: p.name.toLowerCase().replace(/ /g, "-"),
            description: "Toptan satış ürünü",
            price: p.price,
            stock: p.stock,
            image: p.image,
            categoryId: category.id,
            sellerId: seller.id,
            public: true
          }
        });
      }
    }

    return NextResponse.json({ message: "Ürünler başarıyla yüklendi!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}