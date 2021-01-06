import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import * as moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import { Token } from './token.entity';
import { CreateUserTokenDto } from './dto/create-user-token.dto';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {

  async createRefreshToken(createUserTokenDto: CreateUserTokenDto): Promise<Token> {
    const token = new Token()
    token.expireAt = moment()
      .add(60, 'day')
      .toISOString()

    token.refreshToken = uuidv4()
    token.userId = createUserTokenDto.userId
    console.log('token', token);
    await token.save()
    return token

  }

  async deleteToken(refreshToken: string): Promise<DeleteResult> {
    return this.delete({refreshToken})
  }

  async isExistToken(userId: number, refreshToken: string): Promise<boolean> {
    const result = await this.findOne({ userId, refreshToken });
    return !!result
  }
}
