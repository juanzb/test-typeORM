import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ResponseApi } from 'src/common/dto/api-response.dto';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto): Promise<Response<ResponseApi<User>>> {
    let response: ResponseApi<User>;
    try {
      let userCreated: User = await this.userService.create(createUserDto)
      response = {
        success: true,
        message: 'El usuario se registro correctamente',
        data: userCreated
      } 
      return res.status(201).send(response)
    } catch (error) {
      response = {
        success: false,
        message: error.message || 'Error inesperado, intente de nuevo',
      }
      return res.status(400).send(response)
    }
  }

  @Get('all')
  async getAllUsers(@Res() res: Response): Promise<Response<User[]>> {
    let response: ResponseApi<User[]>;
    try {
      let users: User[] = await this.userService.getAll();
      response = {
        success: true,
        message: users.length == 0 ? 'No se econtraron registros.' : 'Se obtuvieron los usuarios correctamente',
        data: users
      }
      return res.status(200).send(response)
    } catch (error) {
      response = {
        success: false,
        message: error.message || 'Error inesperado, intente de nuevo',
      }
      return res.status(404).send(response);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string ) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let data = await this.userService.remove(+id);
    if (!data) {
      return `no existe el usuario con id: ${id}`
    }
    return data
  }
}
