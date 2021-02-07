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

  @Column({
    nullable: false,
    default: '5ccca18c-2716-4b2d-99fb-7f0d38816052'
  })
  fingerprint: string;

  @Column({
    nullable: false,
    default: '192.168.0.1'
  })
  ip: string;

  @ManyToOne(type => User, user => user.id)
  userId: number;

}
