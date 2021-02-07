import { IsEmail, IsString, IsNotEmpty, Matches, IsOptional, IsEnum, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleEnum } from '../enums/role.enum';

export class CreateUserDto {
    @ApiProperty({default: 'lebedencko.k@yandex.ru'})
    @IsEmail()
    email: string;

    @ApiProperty({default: 'user'})
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    username: string;

    @ApiProperty({default: RoleEnum.admin, enum: ['admin', 'user']})
    role: RoleEnum.admin | RoleEnum.user;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    @Matches(
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
      { message: 'Weak password' },
    )
    @ApiProperty({default: 'qwerty123'})
    password: string;

    @IsString()
    @ApiProperty({default: '5ccca18c-2716-4b2d-99fb-7f0d38816052'})
    fingerprint: string
}
