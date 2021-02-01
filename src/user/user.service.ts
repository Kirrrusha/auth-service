import { Injectable, UnauthorizedException, Get, Query, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtPayload } from '../auth/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(payload: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(payload)
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll()
  }

  async deleteById(id: number): Promise<boolean> {
    return this.userRepository.deleteUser(id)
  }

  // async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   return this.userRepository.signUp(authCredentialsDto);
  // }

  // @Get('/confirm')
  // async confirm(@Query(new ValidationPipe()) query: ConfirmAccountDto): Promise<boolean> {
  //   await this.userRepository.confirm(query.token);
  //   return true;
  // }

  // async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
  //   const username = await this.userRepository.validateUserPassword(authCredentialsDto);
  //
  //   if (!username) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //
  //   const payload: JwtPayload = { username };
  //   const accessToken = await this.jwtService.sign(payload);
  //
  //   return { accessToken };
  // }










  // private readonly saltRounds = 10;
  //
  // constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}
  //
  // async hashPassword(password: string): Promise<string> {
  //   const salt = await bcrypt.genSalt(this.saltRounds);
  //   return await bcrypt.hash(password, salt);
  // }
  //
  // async create(createUserDto: CreateUserDto, roles: Array<string>): Promise<IUser> {
  //   const hash = await this.hashPassword(createUserDto.password);
  //   const createdUser = new this.userModel(_.assignIn(createUserDto, { password: hash, roles }));
  //   return await createdUser.save();
  // }
  //
  // async find(id: string): Promise<IUser> {
  //   return await this.userModel.findById(id).exec();
  // }
  //
  // async findByEmail(email: string): Promise<IUser> {
  //   return await this.userModel.findOne({ email }).exec();
  // }
  //
  // async update(_id: string, payload: Partial<IUser>) {
  //   return this.userModel.updateOne({ _id }, payload);
  // }
}
