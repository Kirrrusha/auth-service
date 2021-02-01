import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import {TokenRepository} from '../token/token.repository';
import {AuthService} from './auth.service';
import {JwtStrategy} from '../token/jwt.strategy';
import {MailModule} from '../mail/mail.module';
import {MailService} from '../mail/mail.service';
import { configModule } from 'src/config/configure.root';
import {TokenService} from '../token/token.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    configModule,
    JwtModule.register({
      secret: 'topSecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TokenRepository, UserRepository, TokenService]
})
export class AuthModule {}
