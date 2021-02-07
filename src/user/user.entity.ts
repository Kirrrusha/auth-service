import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from './enums/role.enum';
import { StatusEnum } from './enums/status.enum';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    private readonly saltRounds = 10;
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    role: RoleEnum.admin | RoleEnum.user;

    @Column()
    status: StatusEnum.pending | StatusEnum.blocked | StatusEnum.active;

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
