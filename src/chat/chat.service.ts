import { Injectable, BadRequestException } from '@nestjs/common';
import OpenAI from 'openai';
import { IntegrationsService } from '../integrations/integrations.service';

const SYSTEM_PROMPT = `Você é o assistente virtual do sistema **Gestão de Frotas**.
Responda sempre em português brasileiro, de forma objetiva e amigável.

Módulos disponíveis no sistema:
- **Empresas** (/companies) – Cadastro de empresas (CNPJ, razão social, contato, endereço).
- **Clientes** (/customers) – Cadastro de clientes pessoa física ou jurídica.
- **Veículos** (/vehicles) – Cadastro de veículos da frota (placa, chassi, RENAVAM, modelo, marca).
- **Fornecedores** (/suppliers) – Cadastro de fornecedores e seus contatos.
- **Usuários** (/usuarios) – Gerenciamento de usuários do sistema.
- **Perfis** (/perfis) – Perfis de acesso / permissões.

Funcionalidades gerais:
- Cada listagem possui busca, botões de criar, editar, visualizar e excluir.
- Formulários possuem abas (dados gerais, documentos, endereço, contato, financeiro, etc.).
- Busca de CEP preenche automaticamente endereço.
- O menu lateral pode ser recolhido clicando no ícone de menu.

Se o usuário perguntar algo fora do contexto do sistema, responda educadamente que você só pode ajudar com o sistema Gestão de Frotas.`;

@Injectable()
export class ChatService {
  constructor(private readonly integrationsService: IntegrationsService) {}

  async getStatus(): Promise<{ enabled: boolean }> {
    const setting = await this.integrationsService.findByKey('openai');
    return { enabled: !!setting?.enabled && !!setting?.value };
  }

  async chat(messages: { role: 'user' | 'assistant'; content: string }[]): Promise<string> {
    const setting = await this.integrationsService.findByKey('openai');

    if (!setting?.enabled || !setting?.value) {
      throw new BadRequestException('O módulo de chat está desativado. Ative-o em Integrações.');
    }

    const openai = new OpenAI({ apiKey: this.integrationsService.decryptValue(setting.value) });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 512,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content ?? 'Desculpe, não consegui gerar uma resposta.';
  }
}
