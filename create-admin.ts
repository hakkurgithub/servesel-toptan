const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const password = "123456"; 
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Kullanıcı oluşturuluyor...");

  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      password: hashedPassword,
      role: 'ADMIN', // Şemaya uygun olarak BÜYÜK HARF
    },
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      company: 'Yönetim',
      role: 'ADMIN',        // Şemaya uygun olarak BÜYÜK HARF 
      taxNo: '1111111111',  // Zorunlu alan
      address: 'Merkez Yönetim Ofisi', // Zorunlu alan
      phone: '05555555555', // Zorunlu alan (Hatanın sebebi buydu) 
    },
  });

  console.log(`✅ İşlem Başarılı!`);
  console.log(`Kullanıcı: ${user.email}`);
  console.log(`Şifre: ${password}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Hata:", e);
    await prisma.$disconnect();
    process.exit(1);
  });