import * as Koa from 'koa';
import * as KoaRouter from 'koa-trie-router';
import * as config from 'config';
import * as _mount from 'koa-mount';

const APP_CONFIG = config.get('app');

export class BaseHandler {
  protected router: KoaRouter;
  protected app: Koa;
  public mount_path: string;

  constructor(app: Koa, prefix) {
    this.app = app;
    this.mount_path = APP_CONFIG.namespace + prefix;
    this.router = new KoaRouter(this.mount_path);
  }

  protected mount() {
    this.app.use(_mount(this.mount_path, this.router.middleware()));
  }
}
