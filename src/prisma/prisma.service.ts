import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DATABASE_URL ?? '';
    // Railway exige SSL; adiciona sslmode=require se ainda não estiver na URL
    const hasSSL = connectionString.includes('sslmode');
    const pool = new pg.Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' || !hasSSL
        ? { rejectUnauthorized: false }
        : false,
    });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
