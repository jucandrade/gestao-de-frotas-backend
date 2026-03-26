import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserProfile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserProfileDto): Promise<UserProfile> {
    try {
      return await this.prisma.userProfile.create({ data: dto });
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as any).code === 'P2002'
      ) {
        throw new ConflictException('Ja existe um perfil com este nome');
      }
      throw error;
    }
  }

  async findAll(): Promise<UserProfile[]> {
    return this.prisma.userProfile.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string): Promise<UserProfile> {
    const profile = await this.prisma.userProfile.findUnique({ where: { id } });

    if (!profile) {
      throw new NotFoundException('Perfil nao encontrado');
    }

    return profile;
  }

  async update(id: string, dto: UpdateUserProfileDto): Promise<UserProfile> {
    await this.findOne(id);

    try {
      return await this.prisma.userProfile.update({ where: { id }, data: dto });
    } catch (error) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as any).code === 'P2002'
      ) {
        throw new ConflictException('Ja existe um perfil com este nome');
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.prisma.userProfile.delete({ where: { id } });
  }
}
