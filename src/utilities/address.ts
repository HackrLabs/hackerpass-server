import { Country } from './countries';
import { Location } from './location';

export class Address {
  address1: string;
  address2: string;
  city: string;
  state?: string;
  postalCode: string;
  country: Country;
  location?: Location;

  constructor(data) {
    this.address1 = data.address1;
    this.address2 = data.address2;
    this.city = data.city;
    this.state = data.state || null;
    if (data.country) this.country = data.country
    if (data.location) this.location = data.location;
   }
}
