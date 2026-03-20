---
description: "Use when modifying Prisma schema, creating migrations, or working with database models. Covers Prisma 7.x conventions, model patterns, and migration workflow."
applyTo: "prisma/**"
---
# Padrões Prisma — Gestão de Frotas

## Versão
- Prisma 7.x com `prisma.config.ts`
- Generator: `prisma-client-js` — importar de `@prisma/client`
- Driver adapter: `@prisma/adapter-pg` com `pg.Pool`
- Datasource: URL configurada em `.env` via `dotenv/config`

## Convenções de Model
```prisma
model NomeDoModel {
  id        String   @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // campos do domínio...

  @@map("nome_da_tabela")  // plural, snake_case
}
```

### Regras
- `id` sempre UUID com `@default(uuid())`
- Campos opcionais: `String?` (com `?`)
- Campos únicos: `@unique`
- Tabela mapeada com `@@map("nome_plural_snake_case")`
- Timestamps obrigatórios: `createdAt` e `updatedAt`

## Workflow de Migration
```bash
# Após alterar schema.prisma:
npx prisma migrate dev --name descricao-da-mudanca

# Gerar client sem migração:
npx prisma generate

# Resetar banco (CUIDADO — apaga dados):
npx prisma migrate reset
```

## Relações (padrão para futuras referências)
```prisma
model Filho {
  id       String @id @default(uuid())
  parentId String
  parent   Parent @relation(fields: [parentId], references: [id])

  @@map("filhos")
}

model Parent {
  id     String  @id @default(uuid())
  filhos Filho[]

  @@map("parents")
}
```
