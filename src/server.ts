import * as Koa from 'koa';
import * as config from 'config';
import * as responseTime from 'koa-response-time';
import * as Router from 'koa-trie-router';
import * as mount from 'koa-mount';
import * as bodyparser from 'koa-bodyparser';
import { BindRoutes } from './routes';

const APP_CONFIG = config.get('app');
const app = new Koa();

// X-Response-Time
app.use(responseTime());

// Body Parsing
app.use(bodyparser());

// 404 Handler
app.use(async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    ctx.response.status = 404;
    ctx.response.body = {
      error: true,
      message: 'Entity not found'
    };
  }
});

// 401 Handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log('Error', err)
    if (err.status === 401) {
      ctx.response.status = 401;
      ctx.response.body = {
        error: true,
        message: 'Not Authorized'
      };
    }
  }
});

// Router
BindRoutes(app);

// Listener
app.listen(APP_CONFIG.port, APP_CONFIG.host, () => {
  console.log(`Listening on ${APP_CONFIG.host}:${APP_CONFIG.port}`);
});
