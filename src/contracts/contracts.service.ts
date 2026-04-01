import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Contract } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContractDto): Promise<Contract> {
    const { items, ...contractData } = dto;

    return this.prisma.contract.create({
      data: {
        ...contractData,
        startDate: contractData.startDate
          ? new Date(contractData.startDate)
          : undefined,
        endDate: contractData.endDate
          ? new Date(contractData.endDate)
          : undefined,
        items: items?.length
          ? { create: items }
          : undefined,
      },
      include: { items: true, customer: true },
    });
  }

  async findAll(): Promise<Contract[]> {
    return this.prisma.contract.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: true, customer: true },
    });
  }

  async findOne(id: string): Promise<Contract> {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
      include: { items: true, customer: true },
    });

    if (!contract) {
      throw new NotFoundException('Contrato nao encontrado');
    }

    return contract;
  }

  async update(id: string, dto: UpdateContractDto): Promise<Contract> {
    await this.findOne(id);

    const { items, ...contractData } = dto;

    // Update contract and replace items
    return this.prisma.$transaction(async (tx) => {
      if (items !== undefined) {
        await tx.contractItem.deleteMany({ where: { contractId: id } });
      }

      return tx.contract.update({
        where: { id },
        data: {
          ...contractData,
          startDate: contractData.startDate
            ? new Date(contractData.startDate)
            : undefined,
          endDate: contractData.endDate
            ? new Date(contractData.endDate)
            : undefined,
          items:
            items !== undefined
              ? { create: items }
              : undefined,
        },
        include: { items: true, customer: true },
      });
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.contract.delete({ where: { id } });
  }
}
