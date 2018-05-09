import * as Koa from 'koa';
import { IModelService, IJoinService } from '../../utilities/service';
import { User } from '../users/user';
import { Organization } from './organizations';
import { Database } from '../../utilities/database';
import { View } from '../../utilities/view';

export class OrganizationMemberService implements IJoinService<Organization, User> {
  private database = new Database();
  private baseTable = 'organization_member';

  async get(organizationId, userId): Promise<User[]> {
    let query = `
      SELECT
        User.*
      FROM
        user User
      LEFT JOIN ${this.baseTable} orgMem ON User.id = orgMem.userId
      LEFT JOIN organization Org ON Org.id = orgMem.orgId
      WHERE
        orgMem.orgId = ?
      `;
    let raw = await this.database.query(query, organizationId);
    if (!raw.length) {
      return null;
    }
    return raw.map((row)=> User.fromData(row));
  }
}

export class OrganizationsService implements IModelService {
  private database = new Database();
  private baseTable = 'organizations';

  constructor() {}

  public async byId(id: string): Promise<Organization> {
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
      return Organization.fromData(raw[0]);
		}
		return null;
  }

  public async list(): Promise<Organization[]> {
    return null;
  }

  public async create(body): Promise<Organization> {
    return null;
  }

  public async update(id: string, body: any): Promise<Organization> {
    return null;
  }

  public async delete(id: string): Promise<boolean> {
    return false;
  }

  public async save(organization: Organization): Promise<Organization> {
    return null;
  }
}

