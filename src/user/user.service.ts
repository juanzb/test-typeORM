import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserPass } from './entities/user-psswd.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { DataFullUser } from './dto/dataFull-user.dto';

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
        throw new Error (`El ${duplicateField} ya está asociado a un usuario`);
      }
      throw error;
    }
  }

  async getAll() : Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      return users
    } catch (error) {
       throw error;
    }
  }

  async findOne(id: number) : Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({id: id});
      if(user) return user;
      throw new Error(`No se encontró el usuario con id ${id}`); 
    } catch (error) {
      throw error;
    }
  }

  async findOneUserFull(id: number): Promise<DataFullUser> {
    try {
      const dataFullUser = await this.dataSource.manager.query(`select user.*, user_pass.password, user_pass.createPsswdAt, user_pass.updatePsswdAt from user join user_pass on user.id=user_pass.userId where user.id=${id}`)
      if(dataFullUser[0]) return dataFullUser
      throw new Error(`No se encontró el usuario con id ${id}`);
    } catch (error) {
      throw error
    }
  }

  async update(id: number, dataUserUpdate: UpdateUserDto): Promise<User> {
    try {
      const resultUpdate = await this.userRepository.update({id: id},{...dataUserUpdate})
      if(resultUpdate.affected && resultUpdate.affected > 0) {
        let dataUseUpdate = await this.userRepository.findOneBy({id: id})
        if (dataUseUpdate) return dataUseUpdate;
          throw new Error(`No se encontró el usuario con id ${id} después de la actualización`);
      }
      throw new Error(`No existe el usuario con id ${id} para actualizar los campos`)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        const duplicateField = this.getDuplicateField(error.message, dataUserUpdate);
        throw new Error (`El ${duplicateField} ya está asociado a un usuario`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const userToRemove = await this.userRepository.findOneBy({id: id})
      if (userToRemove) {
        const userDeleted = await this.userRepository.delete({id: id})
        if (userDeleted) return userToRemove;
        throw new Error(`No se encontró el usuario con id ${id} para eliminar el registro`)
      }
      throw new Error (`No existe el usuario con id ${id} para eliminar el registro`)
    } catch (error) {
      throw error
    }
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
