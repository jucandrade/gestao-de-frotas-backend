---
name: nestjs-module
description: "Cria um novo módulo NestJS completo com controller, service e DTO. Use quando precisar gerar um novo domínio/recurso no projeto. Palavras-chave: módulo, recurso, CRUD, endpoint, API."
argument-hint: "Nome do domínio (ex: vehicles, drivers, trips)"
---
# Skill: Criar Módulo NestJS

## Quando usar
- Criar um novo domínio/recurso no sistema (ex: veículos, motoristas, viagens)
- Gerar a estrutura completa: module, controller, service, DTO e modelo Prisma

## Procedimento

### 1. Criar o modelo Prisma
Adicione o modelo em `prisma/schema.prisma` seguindo os [padrões Prisma](../../instructions/prisma-patterns.instructions.md):
- `id` UUID, `createdAt`, `updatedAt`
- `@@map("nome_tabela")` (plural, snake_case)
- Rode `npx prisma migrate dev --name add-<dominio>`

### 2. Criar a estrutura de arquivos
```
src/<dominio>/
├── <dominio>.module.ts
├── <dominio>.controller.ts
├── <dominio>.service.ts
└── dto/
    └── create-<dominio>.dto.ts
```

### 3. DTO — `dto/create-<dominio>.dto.ts`
- Importe decorators de `class-validator`
- Campos obrigatórios: `@IsNotEmpty()` + `@IsString()`
- Campos opcionais: `@IsOptional()` + `@IsString()`

### 4. Service — `<dominio>.service.ts`
- `@Injectable()`
- Injete `PrismaService` no construtor
- Trate erro P2002 (unique) com `ConflictException`
- Importe o tipo do modelo de `../../generated/prisma`

### 5. Controller — `<dominio>.controller.ts`
- `@Controller('<rota>')`
- Thin controller — apenas delega ao service
- Use `@Body()` com DTO tipado

### 6. Module — `<dominio>.module.ts`
- Registre controller e service
- Exporte o service
- NÃO importe `PrismaModule` (é global)

### 7. Registrar no AppModule
- Adicione o novo módulo em `imports` no `src/app.module.ts`

### 8. Verificar
```bash
npx prisma generate
npm run build
```

### 9. Atualizar Chat SYSTEM_PROMPT
Adicione o novo módulo na constante `SYSTEM_PROMPT` em `src/chat/chat.service.ts`, na seção "Módulos disponíveis no sistema:", com o formato:
```
- **Nome do Módulo** (/rota) – Descrição breve da funcionalidade.
```
Ver instrução completa: [update-chat-prompt](../../instructions/update-chat-prompt.instructions.md)

## Checklist
- [ ] Modelo Prisma criado com UUID + timestamps + @@map
- [ ] Migration rodada com sucesso
- [ ] DTO com validações class-validator
- [ ] Service com tratamento de erro P2002
- [ ] Controller fino delegando ao service
- [ ] Módulo registrado no AppModule
- [ ] SYSTEM_PROMPT do chat atualizado com o novo módulo
- [ ] Build sem erros
