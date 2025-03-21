import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User} from './entities/user.entity';
import { UserPass } from './entities/user-pass.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, UserPass])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
