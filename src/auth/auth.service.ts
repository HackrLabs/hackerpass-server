import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { Component, Inject } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { IJWTResponse } from './interfaces/JWTResponse.interface';


@Component()
export class AuthService {
  private config: any = config.get('jwt');

  constructor(
    private readonly usersService: UserService
) {}

  async login(email: string, password: string): Promise<IJWTResponse> {
    let user: User = await this.usersService.getFullUserByEmail(email);
    if (!user || ! await user.checkPassword(password)) return;
    return await this.createToken(user);
  }

  async createToken(user: User): Promise<IJWTResponse> {
    const EXPIRES_IN = 60 * 60;
    const token = jwt.sign({ user: user.id }, this.config.secret, this.config.options);
    return {
      expires_in: EXPIRES_IN,
      access_token: token
    };
  }

  async getUserForToken(token: string): Promise<User> {
    const payload = await jwt.verify(token, this.config.secret);
    return await this.usersService.get(payload.user);
  }
}
