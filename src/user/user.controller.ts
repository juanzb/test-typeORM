import { Controller, Get, Post, Body, Patch, Param, Delete, Res, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ResponseApi } from 'src/common/dto/api-response.dto';
import { Response } from 'express';
import { DataFullUser } from './dto/dataFull-user.dto';
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
  async getAllUsers(@Res() res: Response): Promise<Response<ResponseApi<User[]>>> {
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
  async findOne(@Res() res: Response,@Param('id') id: string ): Promise<Response<ResponseApi<User>>> {
    let response: ResponseApi<User>;
    try {
      const userFound = await this.userService.findOne(+id);
      if (!userFound) throw new NotFoundException('No se encontró el usuario');
      response = {
        success: true,
        message: 'Se obtuvo el usuario correctamente',
        data: userFound
      }
      return res.status(200).send(response);
    } catch (error) {
      response = {
        success: false,
        message: error.message || 'Error inesperado, intente de nuevo',
      }
      return res.status(500).send(response)
    }
  }

  @Get('fulldata/:id')
  async findOneFull(@Res() res: Response,@Param('id') id: string ): Promise<Response<ResponseApi<DataFullUser>>> {
    let response: ResponseApi<DataFullUser>;
    try {
      const userFound: DataFullUser = await this.userService.findOneUserFull(+id);
      response = {
        success: true,
        message: 'Se obtuvo el usuario correctamente',
        data: userFound
      }
      return res.status(200).send(response);
    } catch (error) {
      response = {
        success: false,
        message: error.message || 'Error inesperado, intente de nuevo',
      }
      return res.status(500).send(response)
    }
  }

  @Patch(':id')
  async update(@Res() res: Response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Response<ResponseApi<User>>> {
    let response: ResponseApi<User>
    try {
      const userUpdate = await this.userService.update(+id, updateUserDto);
      response = {
        success: true,
        message: 'El usuario se actualizo correctamente',
        data: userUpdate
      }
      return res.status(200).send(response)
    } catch (error) {
      response = {
        success: false,
        message: error.message,
      }
      return res.status(500).send(response)
    }
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string): Promise<Response<ResponseApi<User>>> {
    let response: ResponseApi<User>
    try {
      let data = await this.userService.remove(+id);
      response = {
        success: true,
        message: 'El usuario se elimino correctamente',
        data: data
      }
      return res.status(200).send(response)
    } catch (error) {
      response = {
        success: false,
        message: error.message || 'Error inesperado, intente de nuevo',
      }
      return res.status(500).send(response)
    }
  }
}
