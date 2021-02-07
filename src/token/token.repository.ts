import { EntityRepository, Repository, DeleteResult, getRepository } from 'typeorm';
import * as moment from 'moment'
import { v4 as uuidv4 } from 'uuid';
import { Token } from './token.entity';
import { CreateUserTokenDto } from './dto/create-user-token.dto';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {

  async createRefreshToken(userId: number): Promise<Token> {
    const token = new Token()
    token.expireAt = moment()
      .add(60, 'day')
      .toISOString()

    token.refreshToken = uuidv4()
    token.userId = userId
    await token.save()
    return token
  }

  async findRefreshToken(refreshToken: string): Promise<Token> {
    return getRepository(Token).findOne({refreshToken})
  }

  async findByUserId(userId: number): Promise<Token[]> {
    return this.find({userId})
  }

  async updateRefreshToken(id: number) {
    return getRepository(Token).createQueryBuilder().update()
      .set({
        expireAt: moment()
          .add(60, 'day')
          .toISOString(),
        refreshToken: uuidv4()
      })
      .where("id = :id", { id })
      .execute()
  }

  async getAll(): Promise<Token[]> {
    return await this.find()
  }

  async deleteToken(refreshToken: string): Promise<DeleteResult> {
    return this.delete({refreshToken})
  }

  async deleteById(id: number): Promise<DeleteResult> {
    return this.delete(id)
  }

  async isExistToken(userId: number, refreshToken: string): Promise<boolean> {
    const result = await this.findOne({ userId, refreshToken });
    return !!result
  }
}
