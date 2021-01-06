import { IsEmail, IsString, IsNotEmpty, Matches, IsOptional, IsEnum, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleEnum } from '../enums/role.enum';

export class CreateUserDto {
    @ApiProperty({default: 'test@test.ru'})
    @IsEmail()
    email: string;

    @ApiProperty({default: 'user'})
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({default: RoleEnum.admin, enum: ['admin', 'user']})
    role: RoleEnum.admin | RoleEnum.user;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
      { message: 'Weak password' },
    )
    @ApiProperty({default: 'qwertyasd123'})
    password: string;
}
