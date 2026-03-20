# Diretrizes do Projeto — Gestão de Frotas

## Stack Tecnológica
- **Runtime**: Node.js + TypeScript
- **Framework**: NestJS (arquitetura modular)
- **ORM**: Prisma 7.x com PostgreSQL
- **Validação**: class-validator + class-transformer
- **Client Prisma**: generator `prisma-client-js` — importar de `@prisma/client`
- **Driver Adapter**: `@prisma/adapter-pg` com `pg` pool

## Arquitetura
- Cada domínio em seu próprio módulo NestJS: `src/<domínio>/`
- Estrutura por módulo: `module.ts`, `controller.ts`, `service.ts`, `dto/`
- `PrismaModule` é `@Global()` — não precisa importar em cada módulo
- Controllers são finos — delegam toda lógica ao service
- Services injetam `PrismaService` via construtor

## Convenções de Código
- Idioma do código: **inglês** (nomes de classes, variáveis, métodos)
- Idioma das mensagens de erro e comentários: **português brasileiro**
- DTOs usam decorators `class-validator` para validação
- Campos obrigatórios: `@IsNotEmpty()` + `@IsString()`
- Campos opcionais: `@IsOptional()` + `@IsString()`
- `ValidationPipe` global configurado com `whitelist`, `forbidNonWhitelisted`, `transform`

## Banco de Dados
- Modelos Prisma mapeados com `@@map("nome_tabela")` (plural, snake_case)
- `id` sempre UUID com `@default(uuid())`
- Timestamps: `createdAt @default(now())`, `updatedAt @updatedAt`
- Erros Prisma P2002 (unique) → `ConflictException`

## Comandos
- Build: `npm run build`
- Dev: `npm run start:dev`
- Prisma generate: `npx prisma generate`
- Prisma migrate: `npx prisma migrate dev --name <nome>`
- Testes: `npm run test`
- Lint: `npm run lint`
