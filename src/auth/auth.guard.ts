import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { AuthService } from './auth.service';
import { Component, Inject } from '@nestjs/common';
import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { User } from '../users/user.entity';
import { Reflector } from '@nestjs/core';

@Guard()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private readonly  reflector: Reflector) {}

  async canActivate(req, context: ExecutionContext): Promise<boolean> {
    const { parent, handler } = context;
    // Ensures that auth is required unless explicitly set to false.
    let auth: boolean = this.reflector.get<boolean>('auth', handler)
    if (auth == undefined) auth = true;
    req.authorizationRequired = auth;
    if (!auth) return true;
    // TODO(groved): Make this throw a custom exception so we can have messaging.
    if (!req.headers.hasOwnProperty('authorization') && auth) {
      return false;
    }

    const bearerToken = req.headers.authorization.split(' ')[1];
    req.user = await this.authService.getUserForToken(bearerToken);
    return true;
  }
}
