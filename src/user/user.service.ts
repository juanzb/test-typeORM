import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserPass } from './entities/user-pass.entity';
import { JoinTable, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dataUser: CreateUserDto) {
    const dataCreatedUser = await this.dataSource.transaction(async (manager) => {
      const createdUser = await manager.save(User, {
        name: dataUser.name,
        lastname: dataUser.lastname,
        email: dataUser.email,
        identityNum: dataUser.identityNum,
        cellphoneNum: dataUser.cellphoneNum,
        age: dataUser.age,
        birthdate: new Date(dataUser.birthdate),
        gender: dataUser.gender,
        createdAt: dataUser.createdAt,
        updatedAt: dataUser.updatedAt,
      })
      await manager.save(UserPass, {
          user: createdUser,
          password: await this.generateHashPassword(dataUser.password),
      })
      return createdUser
    })
    return dataCreatedUser;
  }

  async getAll() : Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number) : Promise<User | null> {
    return await this.userRepository.manager.findOne(User, {where: {id: id}});
  }

  async findOneUserFull(id: number): Promise<User | null> {
    return await this.dataSource.manager.query(`select *, user_pass.password, user_pass.createPassdAt, user_pass.updatePassdAt from user join user_pass on user.id=user_pass.userId where user.id=${id}`)
  }

  async update(id: number, updateUser: UpdateUserDto): Promise<User | null> {
    const userUpdate = await this.userRepository.manager.findOne(User, {where: {id: id}})
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

  async generateHashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash
  }

}
