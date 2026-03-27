require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');
const crypto = require('crypto');

const connectionString = process.env.DATABASE_URL ?? '';
const pool = new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
  .catch((e) => { console.error('SEED ERROR:', e.message); })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
