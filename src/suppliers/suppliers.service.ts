import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Supplier } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSupplierDto): Promise<Supplier> {
    try {
      return await this.prisma.supplier.create({ data: dto });
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as any).code === 'P2002'
      ) {
        throw new ConflictException(
          'Ja existe um fornecedor com este CPF ou CNPJ',
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Supplier[]> {
    return this.prisma.supplier.findMany({
      orderBy: { name: 'asc' },
      include: { contacts: true },
    });
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
      include: { contacts: true },
    });

    if (!supplier) {
      throw new NotFoundException('Fornecedor nao encontrado');
    }

    return supplier;
  }

  async update(id: string, dto: UpdateSupplierDto): Promise<Supplier> {
    await this.findOne(id);

    try {
      return await this.prisma.supplier.update({
        where: { id },
        data: dto,
        include: { contacts: true },
      });
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as any).code === 'P2002'
      ) {
        throw new ConflictException(
          'Ja existe um fornecedor com este CPF ou CNPJ',
        );
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.supplier.delete({ where: { id } });
  }
}
