import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Az önce oluşturduğumuz dosyadan çekiyoruz

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };