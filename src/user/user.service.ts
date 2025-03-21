import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserPass } from './entities/user-pass.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserPass)
    private readonly userPassRepository: Repository<UserPass>,
  ) {}

  async create(dataUser: CreateUserDto) {
    const newUser = {
      name: dataUser.name,
      lastname: dataUser.lastname,
      email: dataUser.email,
      status: dataUser.status,
    }

    const userCreated: User =  await this.dataSource.transaction(async (manager) => {
      const createdUser = await manager.save(User, newUser)
      const newUserPass = {
        idUser: createdUser.id,
        password: dataUser.password,
      }

      await manager.save(UserPass, newUserPass)
      return createdUser
    })

    return userCreated;
  }

  async getAll() : Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number) : Promise<User | null> {
    return await this.userRepository.manager.findOne(User, {where: {id: id}});
  }

  async update(id: number, updateUser: UpdateUserDto): Promise<User | null> {
    const userUpdate = await this.userRepository.findOneBy({id: id})
    if (userUpdate) {
      await this.userRepository.update({id: id}, updateUser)
    }
    return userUpdate
  }

  async remove(id: number): Promise<User | null> {
    const userRemove = await this.userRepository.findOneBy({id: id})
    if (userRemove) {
      await this.userRepository.delete({id: id})
    }
    return userRemove;
  }
}
