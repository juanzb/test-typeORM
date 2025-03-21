import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDB } from './config/database.config';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/config/env/.env.development`,
      isGlobal: true, // Permite acceder a las variables en toda la app
    }),
    UserModule,
    TypeOrmModule.forRoot(configDB),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
