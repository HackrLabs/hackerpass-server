import * as Koa from 'koa';
import * as KoaRouter from 'koa-trie-router';
import { BaseHandler } from '../../utilities/base-handler';
import { UserService } from './user.service';
import { IService } from '../../utilities/service';

const BASE_PATH = '/users';

export class UsersHandler extends BaseHandler {
  private BASE_PATH: string = BASE_PATH;
  private service: IService;

  constructor(app: Koa, prefix) {
    super(app, prefix + BASE_PATH);
    this.service = new UserService();
    this.router.post('/', this.create.bind(this));
    this.router.get('/', this.list.bind(this));
    this.router.get('/:id', this.byId.bind(this));
    this.router.put('/:id', this.update.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
  }

  static mount(app, prefix: string = "") {
    const instance = new UsersHandler(app, prefix);
    instance.mount();
  }

  async list(ctx) {
    ctx.body = await this.service.list();
  }

  async byId(ctx) {
    ctx.body = await this.service.byId(ctx.request.params.id);
  }

  async create(ctx) {
    ctx.status = 201;
    ctx.body = await this.service.create(ctx.request.body);
  }

  async delete(ctx) {
    ctx.status = 204;
    ctx.body = await this.service.delete(ctx.request.params.id);
  }

  async update(ctx) {
    ctx.body = await this.service.update(
      ctx.request.params.id,
      ctx.request.body);
  }
}
