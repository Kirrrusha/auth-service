import { Repository, EntityRepository, getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { StatusEnum } from './enums/status.enum';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    constructor() {
        super();
    }
    private readonly saltRounds = 10;

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.username = createUserDto.username;
        user.email = createUserDto.email;
        user.role = createUserDto.role;
        user.status = StatusEnum.pending;
        const salt = await bcrypt.genSalt(this.saltRounds);
        user.password = await this.hashPassword(createUserDto.password, salt);

        await user.save();
        return user
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;
        const user = await getRepository(User).findOne({username});
        if (user && await user.validatePassword(password)) {
            return user;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async getAll(): Promise<User[]> {
        return await this.find()
    }

    async findById(id: number): Promise<IUser> {
      return await this.findOne(id);
    }

    async verifyUser({id, status}): Promise<boolean> {
        StatusEnum.pending === status && await getRepository(User).createQueryBuilder().update()
        .set({ status: StatusEnum.active })
        .where("id = :id", { id })
        .execute()
        return true
    }

    async findByEmail(email: string): Promise<IUser> {
      return await this.findOne({ email });
    }

    async updateUser(id: number, payload: Partial<IUser>) {
        const user = await this.findOne({ id });
        user.email = payload.email;
        user.username = payload.username;
        await user.save();
        return user
    }

    async deleteUser(id: number) {
        await this.delete(id)
        return true
    }

}
