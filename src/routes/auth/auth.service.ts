import * as Koa from 'koa';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { Database } from '../../utilities/database';
import { IService } from '../../utilities/service';
import { User } from '../users/user';

const JWT_CONFIG = config.get('jwt');

export class AuthError extends Error {
  constructor(message: string = "Username/password combination incorrect") {
    super(message);
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export class AuthService implements IService {
  private database: Database = new Database();
  constructor() {}

  public async login(email: string, password: string): Promise<any> {
    let query = 'SELECT * FROM user WHERE ?';
    let raw = await this.database.query(query, {email});
    if (!raw.length) throw new AuthError();
    let user = User.fromData(raw[0]);
    if (!await User.checkPassword(password, user.password))
      throw new AuthError();
    return await jwt.sign({
      userId: user.id,
    }, JWT_CONFIG.secret, JWT_CONFIG.options);
  }
}

