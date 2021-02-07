import {Body, Controller, Post, Get, Delete, Param, Query} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {User} from './user.entity';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getAll()
  }

  // @Post()
  // createUser(
  //   @Body() payload: CreateUserDto
  // ) {
  //   return this.userService.createUser(payload)
  // }

  @Delete(':id')
  deleteUser(
    @Param('id') id: number
  ) {
    return this.userService.deleteById(id)
  }
}
