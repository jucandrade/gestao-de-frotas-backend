import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SupplierContactsService } from './supplier-contacts.service';
import { CreateSupplierContactDto } from './dto/create-supplier-contact.dto';
import { UpdateSupplierContactDto } from './dto/update-supplier-contact.dto';

@Controller('supplier-contacts')
export class SupplierContactsController {
  constructor(
    private readonly supplierContactsService: SupplierContactsService,
  ) {}

  @Post()
  async create(@Body() dto: CreateSupplierContactDto) {
    return this.supplierContactsService.create(dto);
  }

  @Get()
  async findAll(@Query('supplierId') supplierId: string) {
    return this.supplierContactsService.findAllBySupplierId(supplierId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.supplierContactsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateSupplierContactDto,
  ) {
    return this.supplierContactsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.supplierContactsService.remove(id);
  }
}
