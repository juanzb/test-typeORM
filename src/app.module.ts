import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDB } from './config/database.config';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(configDB),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
