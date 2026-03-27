import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const connectionString = process.env.DATABASE_URL ?? '';
    const isLocal =
      connectionString.includes('localhost') ||
      connectionString.includes('127.0.0.1');

    const pool = new pg.Pool({
      connectionString,
      ssl: isLocal ? undefined : { rejectUnauthorized: false },
    });

    pool.on('error', (err) => {
      new Logger(PrismaService.name).error(
        `Erro no pg.Pool: ${err.message}`,
        err.stack,
      );
    });

    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Banco de dados conectado com sucesso');
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Falha ao conectar no banco durante startup: ${err.message}`,
        err.stack,
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

