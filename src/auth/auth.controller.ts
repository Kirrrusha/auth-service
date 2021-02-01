import {Body, Controller, Post, ValidationPipe, Get, Query} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRepository } from '../user/user.repository';
import {AuthService} from './auth.service';
import {ApiImplicitQuery} from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  @Post('sign-up')
  signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @Post('refresh-tokens')
  refreshTokens() {
    return this.authService.refreshToken('refreshToken')
  }

  @Get('confirm')
  @ApiImplicitQuery({
    name: 'token',
    required: true,
    type: String,
  })
  async verifyUser(@Query(new ValidationPipe()) params): Promise<boolean> {
    return this.authService.verifyUser(params.token)
  }

}
