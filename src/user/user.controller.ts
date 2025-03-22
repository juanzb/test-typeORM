import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    let result = await this.userService.create(createUserDto)
    return result;
  }

  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAll();
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
