require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  const profile = await prisma.userProfile.upsert({
    where: { name: 'Administrador' },
    update: {},
    create: { name: 'Administrador', permissions: {} },
  });

  const user = await prisma.user.upsert({
    where: { email: 'admin@gestaodefrotas.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@gestaodefrotas.com',
      passwordHash: hashPassword('admin123'),
      profileId: profile.id,
    },
  });

  console.log('Seed OK - usuario: ' + user.email);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
