import * as Koa from 'koa';
import * as KoaRouter from 'koa-trie-router';
import { BaseHandler } from '../../utilities/base-handler';
import { AuthService, AuthError } from './auth.service';

const BASE_PATH = '/auth';

enum Type {
  BEARER = 0,
}

export class AuthHandler extends BaseHandler {
  private BASE_PATH: string = BASE_PATH;
  private service: AuthService;

  constructor(app: Koa, prefix) {
    super(app, prefix + BASE_PATH);
    this.service = new AuthService();
    this.router.post('/login', this.login.bind(this));
  }

  static mount(app, prefix: string = "") {
    const instance = new AuthHandler(app, prefix);
    instance.mount();
  }

  async login(ctx) {
    let body = ctx.request.body;
    console.log('BODY', body);
    try {
      let token = await this.service.login(body.email, body.password);
      console.log('Token', token);
      ctx.body = {
        authorization: Type.BEARER,
        token,
      };
    } catch (err) {
      console.log(err)
      ctx.status = 401;
      return;
    }
  }
}
