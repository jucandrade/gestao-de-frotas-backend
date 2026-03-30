---
description: "Use when adding a new module, feature, entity, or CRUD to the system. Ensures the AI chatbot assistant is updated with knowledge about the new functionality. Keywords: novo módulo, nova funcionalidade, nova entidade, new module, new feature, new entity, CRUD."
---
# Atualizar Assistente de Chat (SYSTEM_PROMPT)

Sempre que um novo módulo, funcionalidade ou entidade for adicionado ao sistema, **obrigatoriamente** atualize o `SYSTEM_PROMPT` no arquivo:

```
gestao-de-frotas-back-end/src/chat/chat.service.ts
```

## O que atualizar

Na constante `SYSTEM_PROMPT`, na seção **"Módulos disponíveis no sistema:"**, adicione uma nova linha descrevendo o módulo:

```
- **Nome do Módulo** (/rota) – Descrição breve da funcionalidade.
```

### Exemplo

Se foi criado um módulo de **Motoristas** com rota `/drivers`:

```diff
 Módulos disponíveis no sistema:
 - **Empresas** (/companies) – Cadastro de empresas (CNPJ, razão social, contato, endereço).
 - **Clientes** (/customers) – Cadastro de clientes pessoa física ou jurídica.
+- **Motoristas** (/drivers) – Cadastro de motoristas da frota (CNH, categoria, validade).
```

## Checklist

- [ ] Nova linha adicionada em `SYSTEM_PROMPT` → seção "Módulos disponíveis no sistema"
- [ ] Rota correta (a mesma usada no frontend/sidebar)
- [ ] Descrição inclui os campos/funcionalidades principais do módulo
- [ ] Se o módulo tem funcionalidades especiais (ex: abas, filtros), mencioná-las na seção "Funcionalidades gerais"
