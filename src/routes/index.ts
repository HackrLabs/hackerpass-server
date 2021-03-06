import * as config from 'config';
import * as mount from 'koa-mount';
import * as KoaTrieRouter from 'koa-trie-router';
import { UsersHandler } from './users';
import { AuthHandler } from './auth';
import { UserRole } from '../utilities/roles';
const APP_CONFIG = config.get('app');

export function BindRoutes(app) {
  const router = new KoaTrieRouter();
  router.get(APP_CONFIG.namespace, async (ctx) => {
    ctx.body = {
      active: true,
      timestamp: new Date().getTime()
    };
    return ctx;
  });
  app.use(UserRole.middleware());
  app.use(router.middleware());
  AuthHandler.mount(app);
  UsersHandler.mount(app)
}
