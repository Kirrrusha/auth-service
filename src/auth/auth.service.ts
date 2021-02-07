import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import {ITokenPayload, ITokenResponse} from '../token/interfaces/token-payload.interface';
import { TokenRepository } from 'src/token/token.repository';
import {User} from '../user/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import {TokenService} from '../token/token.service';
import {MailService} from '../mail/mail.service';
import {RefreshTokenDto} from '../token/dto/refresh-token.dto';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  private readonly backendAppUrl: string;
  private readonly maxSessionCount: number;

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private tokenRepository: TokenRepository,
    private readonly configService: ConfigService,
    private tokenService: TokenService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {
    this.backendAppUrl = this.configService.get<string>('BE_API_URL');
    this.maxSessionCount = this.configService.get<number>('MAX_SESSION_COUNT');
  }

  async signUp(createUserDto: CreateUserDto) {
    try {
    const user = await this.userRepository.createUser(createUserDto)
    await this.sendConfirmation(user)
    } catch (e) {
      throw new BadRequestException('Something went wrong')
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<ITokenResponse> {
    const user = await this.userRepository.validateUserPassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.tokenRepository.findByUserId(user.id)

    if (tokens.length > this.maxSessionCount) {
      this.logout()
    }

    const {id: userId} = user

    const payload: ITokenPayload = { id: userId };
    const {refreshToken} = await this.tokenRepository.createRefreshToken(userId);
    const accessToken = await this.tokenService.generateToken(payload);

    return { accessToken, refreshToken };
  }

  async refreshToken(payload: RefreshTokenDto): Promise<ITokenResponse> {
    const {expireAt, fingerprint, userId} = await this.tokenRepository.findRefreshToken(payload.refreshToken)
    await this.tokenRepository.deleteToken(payload.refreshToken)
    if (!moment().isAfter(expireAt)) {
      new UnauthorizedException('TOKEN_EXPIRED')
    }

    if (fingerprint !== payload.fingerprint) {
      new UnauthorizedException('INVALID_REFRESH_SESSION')
    }
    const {refreshToken} = await this.tokenRepository.createRefreshToken(userId)
    const tokenPayload: ITokenPayload = { id: userId };
    const accessToken = await this.tokenService.generateToken(tokenPayload);

    return {
      refreshToken,
      accessToken
    }
  }

  async verifyUser(token: string): Promise<boolean> {
    const result = await this.tokenService.decodeToken(token)
    return this.userRepository.verifyUser({id: result.id, status: result.status})
  }

  async sendConfirmation(user: User) {
    const expiresIn = 60 * 60 * 24; // 24 hours
    const tokenPayload = {
      id: user.id,
      status: user.status
    };

    const token = await this.tokenService.generateToken(tokenPayload, { expiresIn });
    const confirmLink = `${this.backendAppUrl}/auth/confirm?token=${token}`;
    await this.mailService.send({
      from: this.configService.get<string>('JS_CODE_MAIL'),
      to: user.email,
      subject: 'Verify User',
      html: `
                <h3>Hello ${user.username}!</h3>
                <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
            `,
    });
  }

  logout() {
    console.log('logout')
  }
}
