import { IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RefreshTokenDto {
  @IsString()
  @ApiProperty({default: '5ccca18c-2716-4b2d-99fb-7f0d38816052'})
  fingerprint: string
  @IsString()
  @ApiProperty({default: '5ccca18c-2716-4b2d-99fb-7f0d38816052'})
  refreshToken: string
}
