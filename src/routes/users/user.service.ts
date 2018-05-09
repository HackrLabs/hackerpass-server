import * as Koa from 'koa';
import { IModelService } from '../../utilities/service';
import { User } from './user';
import { Database } from '../../utilities/database';
import { View } from '../../utilities/view';

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
        ?
      LIMIT 1
    `;
    let raw = await this.database.query(query, {
      id: id,
      active: 'true'
    });
		if (raw.length) {
      let user = User.fromData(raw[0]).toOutput(View.PUBLIC);
			return user;
		}
		return null;
  }

  public async byEmail(email: string, toOut: boolean = true, output: View = View.PUBLIC): Promise<User> {
    let query = `
      SELECT
        *
      FROM
        ${this.baseTable}
      WHERE
        ?
    `;
    let raw = await this.database.query(query, {
      email: email,
      active: true
    });
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
      users.push(User.fromData(row).toOutput(View.PUBLIC));
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
    return User.fromData(raw).toOutput(View.PUBLIC);
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
