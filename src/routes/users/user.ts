import * as bcrypt from 'bcrypt';
import { Address } from '../../utilities/address';
import { Model } from '../../utilities/model';
import { Organization } from '../organizations/organizations';
import { UserRole, UserPermission } from '../../utilities/roles';
import { View } from '../../utilities/view';

export class User extends Model {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  handle: string;
  address: Address;
  permissions: Set<UserPermission>;
  organizations: Set<Organization>;

  save() {
    for(let [key, value] of this.old.entries()) {
      switch(key) {
        case 'password':
          this.hashPassword(this.password);
          break;
      }
    }
  }

  toOutput(view: View): User {
    delete this.password;
    switch(view) {
      case View.PUBLIC:
        delete this.permissions;
        delete this.address;
        break;
      case View.PRIVATE:
        break;
    }
    return this;
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    try {
      const hashedPassword = await bcrypt.hash(password, salt);
      this.password = hashedPassword;
    } catch(err) {}
  }

  static fromData(data): User {
    let user = new User();
    for(let key in data) {
      let value = data[key];
      switch (key) {
        case 'address':
          user[key] = new Address(JSON.parse(value));
          break;
        case 'roles':
          break;
        case 'organizations':
          break;
        case 'active':
          user[key] = (data.active == true);
          break;
        default:
          user[key] = value;
      }
    }
    return user;
  }

  static async checkPassword(password1, password2): Promise<boolean> {
    return await bcrypt.compare(password1, password2);
  }
}
