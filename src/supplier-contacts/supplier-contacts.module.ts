import { Module } from '@nestjs/common';
import { SupplierContactsController } from './supplier-contacts.controller';
import { SupplierContactsService } from './supplier-contacts.service';

@Module({
  controllers: [SupplierContactsController],
  providers: [SupplierContactsService],
  exports: [SupplierContactsService],
})
export class SupplierContactsModule {}
