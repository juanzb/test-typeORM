import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserPass } from './entities/user-psswd.entity';
import { Repository } from 'typeorm';
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

  async create(dataUser: CreateUserDto): Promise<User> {
    try {
      const userCreated: User = await this.dataSource.transaction(async (manager) => {
        const createdUser = await manager.save(User, {...dataUser})
        await manager.save(UserPass, {
            user: createdUser,
            password: await this.generateHashPassword(dataUser.password),
        })
        return createdUser 
      })
      return userCreated
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        const duplicateField = this.getDuplicateField(error.message, dataUser);
        throw {message: `El ${duplicateField} ya está asociado a un usuario`};
      }
      throw error;
    }
  }

  async getAll() : Promise<User[]> {
    try {
      const user = await this.userRepository.find();
      return user
    } catch (error) {
       throw error;
    }
  }

  async findOne(id: number) : Promise<User | null> {
    return await this.userRepository.findOneBy({id: id});
  }

  private async findOneUserFull(id: number): Promise<User | null> {
    return await this.dataSource.manager.query(`select *, user_pass.password, user_pass.createPassdAt, user_pass.updatePassdAt from user join user_pass on user.id=user_pass.userId where user.id=${id}`)
  }

  async update(id: number, dataUserUpdate: UpdateUserDto): Promise<User | null> {
    try {
      (await this.userRepository.update({id: id},{...dataUserUpdate})).affected
      const userUpdate = await this.userRepository.findOneBy({id: id})
      return userUpdate
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        const duplicateField = this.getDuplicateField(error.message, dataUserUpdate);
        throw {message: `El ${duplicateField} ya está asociado a un usuario`};
      }
      throw error;
    }

    // const userUpdate = await this.userRepository.findOneBy({id: id})
    // if (userUpdate) {
    //   await this.userRepository.update({id: id}, updateUser)
    // }
    // return userUpdate
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

  private getDuplicateField(errorMessage: string, dataUser: CreateUserDto): string {
    if (errorMessage.includes(dataUser.identityNum)) return "número de identidad";
    if (errorMessage.includes(dataUser.cellphoneNum)) return "número de teléfono";
    if (errorMessage.includes(dataUser.email)) return "correo electrónico";
    return "campo desconocido";
  }
}
