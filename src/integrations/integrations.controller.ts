import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { UpsertIntegrationDto } from './dto/upsert-integration.dto';
import { Public } from '../auth/decorators/public.decorator';
import { maskApiKey } from '../common/crypto.util';

@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Public()
  @Get()
  async findAll() {
    const settings = await this.integrationsService.findAll();
    return settings.map((s) => ({ ...s, value: maskApiKey(s.value) }));
  }

  @Public()
  @Get(':key')
  async findByKey(@Param('key') key: string) {
    const setting = await this.integrationsService.findByKey(key);
    if (!setting) return null;
    return { ...setting, value: maskApiKey(setting.value) };
  }

  @Public()
  @Put()
  async upsert(@Body() dto: UpsertIntegrationDto) {
    const setting = await this.integrationsService.upsert(dto);
    return { ...setting, value: maskApiKey(setting.value) };
  }
}
