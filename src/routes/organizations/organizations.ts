import { Location } from '../../utilities/location';
import { Address } from '../../utilities/address';
import { User } from '../users/user';

export class Organization {
  id: string;
  name: string;
  address: Address | null;
  members?: Set<User>;

  constructor() {
    this.members = new Set<User>();
  }

  addMember(member: User) {
    this.members.add(member);
  }

  addAddress(address: Address) {
    this.address = address;
  }
}
