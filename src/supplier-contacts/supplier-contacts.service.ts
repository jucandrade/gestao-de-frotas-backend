import { Injectable, NotFoundException } from '@nestjs/common';
import { SupplierContact } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierContactDto } from './dto/create-supplier-contact.dto';
import { UpdateSupplierContactDto } from './dto/update-supplier-contact.dto';

@Injectable()
export class SupplierContactsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSupplierContactDto): Promise<SupplierContact> {
    return this.prisma.supplierContact.create({ data: dto });
  }

  async findAllBySupplierId(supplierId: string): Promise<SupplierContact[]> {
    return this.prisma.supplierContact.findMany({
      where: { supplierId },
      orderBy: { sequence: 'asc' },
    });
  }

  async findOne(id: string): Promise<SupplierContact> {
    const contact = await this.prisma.supplierContact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException('Contato do fornecedor nao encontrado');
    }

    return contact;
  }

  async update(
    id: string,
    dto: UpdateSupplierContactDto,
  ): Promise<SupplierContact> {
    await this.findOne(id);

    return this.prisma.supplierContact.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.supplierContact.delete({ where: { id } });
  }
}
