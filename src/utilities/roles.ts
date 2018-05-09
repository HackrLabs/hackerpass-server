import * as Roles from 'koa-roles';

export enum UserPermission {
  ANON,
  ME,
  MEMBER,
  ADMIN
}

export enum OrganizationPermission {
  ANON,
  PROSPECTIVE,
  MEMBER,
  ADMIN
}

export const UserRole = new Roles({
  async failureHandler(ctx, permission: UserPermission) {
    ctx.status = 403;
    ctx.body = {
      message: 'Access Denied'
    }
  }
});

UserRole.use((ctx, permission: UserPermission) => {
  return ctx.user || permission == UserPermission.ANON;
});

UserRole.use((ctx, permission: UserPermission) => {
  if (ctx.user.permissions.has(permission) ||
      ctx.user.permissions.has(UserPermission.ADMIN)) {
    return true;
  }
})

export const OrganizationRole = new Roles({
  async failureHandler(ctx, permission: OrganizationPermission) {
    ctx.status = 403;
    ctx.body = {
      message: 'Not member of organization'
    }
  }
});

OrganizationRole.use((ctx, permission: OrganizationPermission) => {
  return ctx.user || ctx.organization || permission === OrganizationPermission.ANON;
})

OrganizationRole.use((ctx, permission: OrganizationPermission) => {
  if (ctx.organization.has(permission) ||
      ctx.organization.has(OrganizationPermission.ADMIN)) {
    return true;
  }
});
