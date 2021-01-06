import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../user/enums/role.enum';
import { StatusEnum } from '../../user/enums/status.enum';

export class CreateUserTokenDto {
  @IsNumber()
  @ApiProperty()
  userId: number
  @ApiProperty({enum: ['pending', 'active', 'blocked']})
  status: StatusEnum
  @ApiProperty({enum: ['user', 'admin']})
  role: RoleEnum
}
