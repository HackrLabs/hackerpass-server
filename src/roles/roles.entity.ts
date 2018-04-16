import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { UserRolesEnum } from './roles.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: UserRolesEnum })
  role: UserRolesEnum;
}
