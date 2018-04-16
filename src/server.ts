import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { RolesModule } from './roles/roles.module';
import { RolesGuard } from './roles/roles.guard';
import * as config from 'config';

async function bootstrap() {
  const APP_CONFIG = config.get('app');
  const app = await NestFactory.create(ApplicationModule);
  const authGuard = app.select(AuthModule).get(AuthGuard);
  const roleGuard = app.select(RolesModule).get(RolesGuard);
  app.useGlobalGuards(authGuard);
  app.useGlobalGuards(roleGuard);
  await app.listen(APP_CONFIG.port, APP_CONFIG.host);
}

bootstrap();
