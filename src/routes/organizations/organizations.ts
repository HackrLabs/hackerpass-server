import { Location } from '../../utilities/location';
import { Address } from '../../utilities/address';
import { User } from '../users/user';
import { Model } from '../../utilities/model';
import { View } from '../../utilities/view';

export class OrganizationMember extends Model {
  userId: string;
  organizationId: string;
}


export class Organization extends Model {
  id: string;
  name: string;
  address: Address | null;
  members: Set<User> = new Set<User>();
  active: boolean;

  addMember(member: User) {
    this.members.add(member);

  }

  addAddress(address: Address) {
    this.address = address;
  }

  toOutput(view: View): Organization {
    switch(view) {
      case View.PUBLIC:
        delete this.members;
        break;
    }
    return this;
  }

  static fromData(data): Organization {
    let org = new Organization();
    for(let key in data) {
      let value = data[key];
      switch (key) {
        case 'address':
          org[key] = new Address(JSON.parse(value));
          break;
        case 'active':
          org[key] = (data.active == true);
          break;
        case 'members':
          org[key] = new Set(data.members);
          break;
        default:
          org[key] = value;
      }
    }
    return org;
  }
}
