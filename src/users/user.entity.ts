import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeUpdate, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../roles/roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
    comment: "User handle"
  })
  handle: string;

  @Column({
    select: false
  })
  password: string;

  @Column({ default: true })
  active: boolean;

  @Column({
    type: "json",
  })
  address: {
    address1: string,
    address2: string,
    city: string,
    state: string,
    country: string,
    postal_code: string
  }

  @Column({
    type: "varchar",
    length: 256,
    unique: true,
  })
  email: string

  @ManyToMany(type => Role)
  @JoinTable()
  roles: Promise<Role[]>;

  @CreateDateColumn()
  created: Date

  /**
   * Hashes the password using bcrypt
   */
  async hashPassword() {
    if (!this.password) return;
    this.password = await bcrypt.hash(this.password, 10);
  }

  /**
   * Removes data that should never be sent to the user
   */
  clean() {
    delete this.password;
    return this;
  }

  /**
   * Checks provided password against hashed datbase password.
   *
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
