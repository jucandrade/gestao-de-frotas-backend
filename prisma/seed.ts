import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  // Cria perfil admin se não existir
  const profile = await prisma.userProfile.upsert({
    where: { name: 'Administrador' },
    update: {},
    create: { name: 'Administrador' },
  });

  // Cria usuário admin se não existir
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

  console.log('Seed executado com sucesso!');
  console.log(`Perfil criado: ${profile.name} (id: ${profile.id})`);
  console.log(`Usuário criado: ${user.email}`);
  console.log('Login: admin@gestaodefrotas.com');
  console.log('Senha: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
