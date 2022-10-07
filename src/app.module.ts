import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';
import { CompanyModule } from './modules/company/company.module';

@Module({
  imports: [ConfigModule.forRoot(), AccountModule, UserModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
