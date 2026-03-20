---
description: "Use when creating NestJS modules, controllers, services, or DTOs. Covers module structure, dependency injection, Prisma integration, and validation patterns for this project."
applyTo: "src/**/*.ts"
---
# Padrões NestJS — Gestão de Frotas

## Estrutura de Módulo
Cada domínio segue a estrutura:
```
src/<domínio>/
├── <domínio>.module.ts
├── <domínio>.controller.ts
├── <domínio>.service.ts
└── dto/
    ├── create-<domínio>.dto.ts
    └── update-<domínio>.dto.ts
```

## Controller (fino)
```typescript
@Controller('<rota>')
export class XxxController {
  constructor(private readonly xxxService: XxxService) {}

  @Post()
  async create(@Body() dto: CreateXxxDto) {
    return this.xxxService.create(dto);
  }
}
```
- NÃO coloque lógica de negócio no controller
- Use `@Body()` com DTO tipado para validação automática

## Service
```typescript
@Injectable()
export class XxxService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateXxxDto): Promise<Xxx> {
    try {
      return await this.prisma.xxx.create({ data: dto });
    } catch (error) {
      if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
        throw new ConflictException('Registro duplicado');
      }
      throw error;
    }
  }
}
```

## DTO com class-validator
```typescript
export class CreateXxxDto {
  @IsNotEmpty()
  @IsString()
  campoObrigatorio: string;

  @IsOptional()
  @IsString()
  campoOpcional?: string;
}
```

## Módulo
```typescript
@Module({
  controllers: [XxxController],
  providers: [XxxService],
  exports: [XxxService],
})
export class XxxModule {}
```
- Registre no `AppModule.imports`
- `PrismaService` já está disponível globalmente (não precisa importar `PrismaModule`)

## Import do Prisma Client
```typescript
import { PrismaClient, Xxx } from '@prisma/client';
```
O generator é `prisma-client-js`. Importações sempre de `@prisma/client`.
