import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { Reflector } from '@nestjs/core';
import { UserRolesEnum } from './roles.enum';

@Guard()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(req, context: ExecutionContext): Promise<boolean> {
    const { parent, handler } = context;
    const roles = this.reflector.get<string[]>('roles', handler);
    if (!roles) return true;
    if (!req.user) return false;
    console.log(await req.user.roles);
    if (req.user.hasRoles(UserRolesEnum.SUPER_ADMIN)) return true;
    return await req.user.hasRoles(roles);
  }
}
