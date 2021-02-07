import {Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { TokenRepository } from './token.repository';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { ITokenPayload, ITokenResponse } from './interfaces/token-payload.interface';
import { DecodeOptions, SignOptions } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import {Token} from './token.entity';
import {RefreshTokenDto} from './dto/refresh-token.dto';

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
      role: payload.role,
    };
    const accessToken = await this.generateToken(tokenPayload, { expiresIn })
    const data = await this.tokenRepository.createRefreshToken(payload.userId)
    return {
      refreshToken: data.refreshToken,
      accessToken
    }
  }

  async getAll(): Promise<Token[]> {
    return this.tokenRepository.getAll()
  }

  async generateToken(data: ITokenPayload, options?: SignOptions): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  async decodeToken(token: string, options?: DecodeOptions): Promise<any> {
    return this.jwtService.decode(token, options);
  }

  async deleteById(id: number) {
    return this.tokenRepository.deleteById(id)
  }
}
