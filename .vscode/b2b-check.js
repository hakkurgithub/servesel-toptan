#!/usr/bin/env node
/* VS Code Copilot Otomasyon Betiği
   Amaç: B2B projesinin temel dosyalarını kontrol eder, eksikse oluşturur ve projeyi derler.
*/

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = process.cwd();
const log = (m) => console.log(`\x1b[36m[B2B-Check]\x1b[0m ${m}`); // Renkli log

// 1. .env Dosyası Kontrolü
function fixEnv() {
  const envPath = path.join(root, '.env');
  const needed = {
    DATABASE_URL: 'postgres://postgres:password@localhost:5432/my_b2b_db', // Varsayılan örnek
    NEXTAUTH_SECRET: require('crypto').randomBytes(32).toString('hex'),
    NEXTAUTH_URL: 'http://localhost:3000'
  };
  
  let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  let updated = false;

  Object.entries(needed).forEach(([key, val]) => {
    const regex = new RegExp(`^${key}\\s*=.*$`, 'gm');
    if (!regex.test(content)) {
      content += `\n${key}="${val}"\n`;
      updated = true;
    }
  });

  if (updated || !fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, content);
    log('.env dosyası güncellendi/oluşturuldu.');
  } else {
    log('.env dosyası zaten tam.');
  }
}

// 2. Prisma Şema Kontrolü
function checkPrismaSchema() {
  const schemaDir = path.join(root, 'prisma');
  const schemaPath = path.join(schemaDir, 'schema.prisma');
  
  if (!fs.existsSync(schemaDir)) fs.mkdirSync(schemaDir, { recursive: true });

  if (!fs.existsSync(schemaPath)) {
    log('prisma/schema.prisma bulunamadı → B2B şeması oluşturuluyor...');
    fs.writeFileSync(schemaPath, `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  role      Role     @default(BUYER)
  name      String?
  company   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  orders    Order[]
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Float
  stock       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  orderItems  OrderItem[]
}

model Order {
  id        String      @id @default(cuid())
  userId    String
  user      User        @relation(fields: [userId], references: [id])
  status    OrderStatus @default(PENDING)
  total     Float
  createdAt DateTime    @default(now())
  items     OrderItem[]
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Float
}

enum Role {
  BUYER
  SELLER
  ADMIN
}

enum OrderStatus {
  PENDING
  APPROVED
  SHIPPED
  DELIVERED
  CANCELLED
}
`);
  } else {
    log('Prisma şeması mevcut.');
  }
}

// 3. Prisma Client (Singleton) Kontrolü
function checkPrismaClient() {
  const pcPath = path.join(root, 'src', 'lib', 'prisma.ts');
  if (!fs.existsSync(pcPath)) {
    fs.mkdirSync(path.dirname(pcPath), { recursive: true });
    fs.writeFileSync(pcPath, `import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
`);
    log('src/lib/prisma.ts oluşturuldu.');
  }
}

// 4. NextAuth Route Kontrolü
function checkNextAuthRoute() {
  const routePath = path.join(root, 'src', 'app', 'api', 'auth', '[...nextauth]', 'route.ts');
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(path.dirname(routePath), { recursive: true });
    fs.writeFileSync(routePath, `import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const result = loginSchema.safeParse(credentials);
        if (!result.success) return null;

        const { email, password } = result.data;
        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user) return null;
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return null;

        return { id: user.id, email: user.email, role: user.role };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
  },
  session: { strategy: 'jwt' }
});

export { handler as GET, handler as POST };
`);
    log('NextAuth route handler oluşturuldu.');
  }
}

// 5. Build ve Generate İşlemleri
function runBuild() {
  log('Prisma Generate çalıştırılıyor...');
  try {
    execSync('npx prisma generate', { stdio: 'inherit' });
  } catch (e) {
    log('HATA: Prisma generate başarısız oldu. .env dosyasındaki DATABASE_URL doğru mu?');
    return;
  }

  log('Next.js Build deneniyor...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    log('✅ Build BAŞARILI! Proje çalışmaya hazır.');
  } catch (e) {
    log('❌ Build HATALI. Lütfen yukarıdaki hataları kontrol et.');
  }
}

// Ana Fonksiyon
function main() {
  log('Kontroller başlıyor...');
  fixEnv();
  checkPrismaSchema();
  checkPrismaClient();
  checkNextAuthRoute();
  runBuild();
}

main();