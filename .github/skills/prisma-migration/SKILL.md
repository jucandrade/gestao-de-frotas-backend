---
name: prisma-migration
description: "Gerencia migrações Prisma, alterações de schema e sincronização de banco. Use quando precisar adicionar campos, criar tabelas, alterar relações ou corrigir schema. Palavras-chave: migration, migrate, schema, banco, tabela, campo, relação."
argument-hint: "Descrição da alteração (ex: add-vehicle-model, add-driver-license)"
---
# Skill: Migração Prisma

## Quando usar
- Adicionar/remover campos em modelos existentes
- Criar novas tabelas/modelos
- Alterar relações entre modelos
- Corrigir problemas de schema

## Procedimento

### 1. Editar o schema
Edite `prisma/schema.prisma` seguindo as convenções:
- UUID, timestamps, `@@map` obrigatórios
- Campos opcionais com `?`
- Relações com `@relation(fields: [...], references: [...])`

### 2. Gerar migration
```bash
npx prisma migrate dev --name <descricao-kebab-case>
```

### 3. Se houver erro de migration
```bash
# Ver status das migrações
npx prisma migrate status

# Regenerar client sem migrar
npx prisma generate

# Reset completo (CUIDADO — perde dados)
npx prisma migrate reset
```

### 4. Atualizar código dependente
- Atualize DTOs se novos campos foram adicionados
- Atualize Services se a lógica de negócio mudou
- Rode `npm run build` para validar TypeScript

## Notas
- O Prisma client é importado de `@prisma/client` (generator `prisma-client-js`)
- Usa `@prisma/adapter-pg` como driver adapter para PostgreSQL
- A URL do banco está em `.env`, carregada via `prisma.config.ts` com `dotenv/config`
- Sempre rode `npx prisma generate` após alterar o schema
