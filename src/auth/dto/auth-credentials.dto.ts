import { IsString, MinLength, MaxLength, Matches, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
    @ApiProperty({default: 'user'})
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    username: string;

    @ApiProperty({default: 'qwerty123'})
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @Matches(
      /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
        { message: 'password too weak' },
    )
    password: string;

    @IsString()
    @ApiProperty({default: '5ccca18c-2716-4b2d-99fb-7f0d38816052'})
    fingerprint: string
}
