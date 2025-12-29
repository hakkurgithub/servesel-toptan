import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const orders = await prisma.order.findMany({
    include: { 
        user: true,
        items: { include: { product: true } } 
    },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(orders);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id === "all") {
    await prisma.order.deleteMany();
    return NextResponse.json({ message: "Tüm siparişler silindi" });
  } else if (id) {
    await prisma.order.delete({ where: { id } });
    return NextResponse.json({ message: "Sipariş silindi" });
  }
  
  return NextResponse.json({ error: "ID gerekli" }, { status: 400 });
}