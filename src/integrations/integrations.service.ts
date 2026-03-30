import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpsertIntegrationDto } from './dto/upsert-integration.dto';
import { encrypt, decrypt } from '../common/crypto.util';

@Injectable()
export class IntegrationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.integrationSetting.findMany({
      orderBy: { key: 'asc' },
    });
  }

  async findByKey(key: string) {
    return this.prisma.integrationSetting.findUnique({ where: { key } });
  }

  decryptValue(encryptedValue: string): string {
    try {
      return decrypt(encryptedValue);
    } catch {
      return encryptedValue;
    }
  }

  async upsert(dto: UpsertIntegrationDto) {
    const encryptedValue = dto.value ? encrypt(dto.value) : '';

    return this.prisma.integrationSetting.upsert({
      where: { key: dto.key },
      update: {
        ...(dto.value !== undefined && { value: encryptedValue }),
        ...(dto.enabled !== undefined && { enabled: dto.enabled }),
      },
      create: {
        key: dto.key,
        value: encryptedValue,
        enabled: dto.enabled ?? false,
      },
    });
  }
}
