import {Body, Controller, Post, ValidationPipe, Get, Query, Res, Response} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRepository } from '../user/user.repository';
import {AuthService} from './auth.service';
import {ApiImplicitQuery} from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import { TokenService } from 'src/token/token.service';
import { TokenRepository } from 'src/token/token.repository';
import {RefreshTokenDto} from '../token/dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository,
    private authService: AuthService,
  ) {}

  @Post('sign-up')
  signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @Post('sign-in')
  async signIp(@Body(new ValidationPipe()) authCredentialsDto: AuthCredentialsDto) {
    // todo add cookies
    return this.authService.signIn(authCredentialsDto)
  }

  @Post('refresh-token')
  refreshTokens(@Body(new ValidationPipe()) payload: RefreshTokenDto) {
    return this.authService.refreshToken(payload)
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
