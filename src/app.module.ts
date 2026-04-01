import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CompaniesModule } from './companies/companies.module';
import { CustomersModule } from './customers/customers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { SupplierContactsModule } from './supplier-contacts/supplier-contacts.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { ContractsModule } from './contracts/contracts.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    PrismaModule,
    CompaniesModule,
    CustomersModule,
    VehiclesModule,
    SuppliersModule,
    SupplierContactsModule,
    UserProfilesModule,
    UsersModule,
    AuthModule,
    ChatModule,
    IntegrationsModule,
    ContractsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
