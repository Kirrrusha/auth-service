import { Controller } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';

@Controller('auth')
export class AuthController {
  constructor(private userRepository: UserRepository) {
  }


}
