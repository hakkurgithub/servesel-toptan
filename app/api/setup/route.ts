import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Veritabanı boş mu kontrol et
    const count = await prisma.product.count();

    if (count === 0) {
      
      // Eklenecek ham veriler (Slug olmadan)
      const rawProducts = [
        {
          name: "Örnek Ürün 1",
          description: "Sistem tarafından oluşturulan otomatik ürün.",
          price: 100,
          stock: 50,
          category: "Genel",
          isActive: true,
          link: "" 
        },
        {
          name: "Örnek Ürün 2",
          description: "Bu da ikinci örnek ürünümüz.",
          price: 250,
          stock: 20,
          category: "Elektronik",
          isActive: true,
          link: ""
        }
      ];

      // 2. Her ürüne otomatik Slug ekle
      const dataWithSlugs = rawProducts.map((product) => {
        // İstediğin slug oluşturma mantığı:
        let slug = product.name
          .toLowerCase()
          .replace(/\s+/g, '-')             // Boşlukları tire yap
          .replace(/[^a-z0-9ğüşıöç-]/g, ''); // Özel karakterleri temizle
        
        // Benzersiz olması için sonuna zaman damgası ekle (Çakışmayı %100 önler)
        // Setup dosyası olduğu için veritabanı boş, ama yine de garanti olsun.
        slug = `${slug}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        return {
          ...product,
          slug: slug
        };
      });

      // 3. Toplu Kayıt Yap (createMany)
      await prisma.product.createMany({
        data: dataWithSlugs
      });

      return NextResponse.json({ message: "Kurulum tamamlandı, örnek ürünler eklendi." });
    }

    return NextResponse.json({ message: "Sistem zaten kurulu." });

  } catch (error: any) {
    console.error("Setup Hatası:", error);
    return NextResponse.json({ error: "Kurulum hatası: " + error.message }, { status: 500 });
  }
}