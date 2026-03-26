import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Vehicle } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateVehicleDto): Promise<Vehicle> {
    try {
      return await this.prisma.vehicle.create({ data: dto });
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as any).code === 'P2002'
      ) {
        throw new ConflictException('Ja existe um veiculo com esta placa');
      }
      throw error;
    }
  }

  async findAll(customerId?: string): Promise<Vehicle[]> {
    return this.prisma.vehicle.findMany({
      where: customerId ? { customerId } : undefined,
      include: { customer: { select: { id: true, name: true, code: true } } },
      orderBy: { plate: 'asc' },
    });
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: { customer: { select: { id: true, name: true, code: true } } },
    });

    if (!vehicle) {
      throw new NotFoundException('Veiculo nao encontrado');
    }

    return vehicle;
  }

  async update(id: string, dto: UpdateVehicleDto): Promise<Vehicle> {
    await this.findOne(id);

    try {
      return await this.prisma.vehicle.update({
        where: { id },
        data: dto,
        include: { customer: { select: { id: true, name: true, code: true } } },
      });
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as any).code === 'P2002'
      ) {
        throw new ConflictException('Ja existe um veiculo com esta placa');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.vehicle.delete({ where: { id } });
  }
}
