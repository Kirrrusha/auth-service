import {BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@Unique(['refreshToken'])
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refreshToken: string;

  @Column()
  expireAt: string;

  @ManyToOne(type => User, user => user.id)
  userId: number;

}
