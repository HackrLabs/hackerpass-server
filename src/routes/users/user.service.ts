import * as Koa from 'koa';
import { IModelService } from '../../utilities/service';
import { User, UserView } from './user';
import { Database } from '../../utilities/database';

export class UserService implements IModelService {
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

  public async byEmail(email: string, toOut: boolean = true, output: UserView = UserView.PUBLIC): Promise<User> {
    let query = `
      SELECT
        *
      FROM
        ${this.baseTable}
      WHERE
        active = true
      AND
        email = :email
    `;
    let raw = await this.database.query(query, {email});
    if (!raw) return null;
    if (toOut) return User.fromData(raw).toOutput(output)
    return User.fromData(raw);
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
    let query = `
      INSERT INTO
        ${this.baseTable}
      SET
        ?
    `;
    let raw = await this.database.query(query, body);
    return User.fromData(raw).toOutput(UserView.PUBLIC);
  }

  public async delete(id: string): Promise<boolean> {
    let query = `DELETE FROM ${this.baseTable} WHERE id = :id LIMIT 1`;
    let raw = await this.database.query(query, {id});
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
