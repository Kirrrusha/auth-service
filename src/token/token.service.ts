import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenRepository } from './token.repository';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { ITokenPayload, ITokenResponse } from './interfaces/token-payload.interface';
import { DecodeOptions, SignOptions } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {

  constructor(
    @InjectRepository(TokenRepository)
    private tokenRepository: TokenRepository,
    private readonly jwtService: JwtService
  ) {
  }

  async createToken(payload: CreateUserTokenDto): Promise<ITokenResponse> {
    const expiresIn = 60 * 60 * 0.5; // 0.5 hours
    const tokenPayload = {
      id: payload.userId,
      status: payload.status,
      roles: payload.role,
    };
    const accessToken = await this.generateToken(tokenPayload, { expiresIn })
    const data = await this.tokenRepository.createRefreshToken(payload)
    return {
      refreshToken: data.refreshToken,
      accessToken
    }
  }

  async generateToken(data: ITokenPayload, options?: SignOptions): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  async decodeToken(token: string, options?: DecodeOptions): Promise<any> {
    return this.jwtService.decode(token, options);
  }
}
