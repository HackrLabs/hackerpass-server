import * as Koa from 'koa';
import { IService } from '../../utilities/service';
import { User, UserView } from './user';
import { Database } from '../../utilities/database';

export class UserService implements IService {
  private database = new Database();
  private baseTable = 'user';

  constructor() {}

  public async byId(id: string): Promise<User> {
    let query = `
      SELECT
        *
      FROM
        ${this.baseTable}
      WHERE
        id = ?
      AND
        active = true
      LIMIT 1
    `;
    let raw = await this.database.query(query, id);
		if (raw.length) {
			let user = User.fromData(raw[0]).toOutput(UserView.PUBLIC);
			return user;
		}
		return null;
  }

  public search(): Promise<User[]> {
    return;
  }

  public async list(): Promise<User[]> {
    let query = `
      SELECT
        *
      FROM
        ${this.baseTable}
      WHERE
        active = true
    `;
    let raw = await this.database.query(query);
    let users: User[] = [];
    for(let row of raw) {
      users.push(User.fromData(row).toOutput(UserView.PUBLIC));
    }
    return users;
  }

  public async create(body): Promise<User> {
    const user = new User();
    return user;
  }

  public async delete(id: string): Promise<boolean> {
    return true;
  }

  public async update(id: string, body: any): Promise<User> {
    const user: User = null;
    return user;
  }

	public async save(user: User): Promise<User> {
		return null;
	}
}
