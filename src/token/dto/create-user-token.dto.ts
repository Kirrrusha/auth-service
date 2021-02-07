import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../user/enums/role.enum';
import { StatusEnum } from '../../user/enums/status.enum';

export class CreateUserTokenDto {
  @IsNumber()
  @ApiProperty()
  userId: number
  // @IsString()
  // @ApiProperty({default: '5ccca18c-2716-4b2d-99fb-7f0d38816052'})
  // fingerprint: string
  // @IsString()
  // @ApiProperty({default: '192.168.0.1'})
  // ip: string
  @ApiProperty({enum: ['pending', 'active', 'blocked']})
  status: StatusEnum
  @ApiProperty({enum: ['user', 'admin']})
  role: RoleEnum
}
