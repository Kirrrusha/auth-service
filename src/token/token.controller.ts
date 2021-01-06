import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { CreateUserTokenDto } from './dto/create-user-token.dto';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {
  }

  @Post()
  createToken(
    @Body() payload: CreateUserTokenDto
  ) {
    return this.tokenService.createToken(payload)
  }
}
