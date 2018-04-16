import { ReflectMetadata } from '@nestjs/common';
import { UserRolesEnum } from './roles.enum';

export const Roles = (...roles: UserRolesEnum[]) => ReflectMetadata('roles', roles);
