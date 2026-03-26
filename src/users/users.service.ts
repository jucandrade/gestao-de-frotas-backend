import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const { password, ...rest } = dto;

    try {
      const user = await this.prisma.user.create({
        data: { ...rest, passwordHash: hashPassword(password) },
        include: { profile: { select: { id: true, name: true } } },
      });

      const { passwordHash: _, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as any).code === 'P2002'
      ) {
        throw new ConflictException('Ja existe um usuario com este e-mail ou CPF');
      }
      throw error;
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: { profile: { select: { id: true, name: true } } },
      orderBy: { name: 'asc' },
    });

    return users.map(({ passwordHash: _, ...u }) => u);
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: { select: { id: true, name: true } } },
    });

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);

    const { password, ...rest } = dto;
    const data: Record<string, unknown> = { ...rest };

    if (password) {
      data.passwordHash = hashPassword(password);
    }

    try {
      const user = await this.prisma.user.update({
        where: { id },
        data,
        include: { profile: { select: { id: true, name: true } } },
      });

      const { passwordHash: _, ...safeUser } = user;
      return safeUser;
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as any).code === 'P2002'
      ) {
        throw new ConflictException('Ja existe um usuario com este e-mail ou CPF');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
  }
}
