import { Body, Controller, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {User} from './user.entity';

@ApiTags('users')
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getAll()
  }

  @Post()
  createUser(
    @Body() payload: CreateUserDto
  ) {
    return this.userService.createUser(payload)
  }
}
