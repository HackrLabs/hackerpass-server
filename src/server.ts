import * as Koa from 'koa';
import * as Router from 'koa-trie-router';
import * as bodyparser from 'koa-bodyparser';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import * as mount from 'koa-mount';
import * as responseTime from 'koa-response-time';
import { UserService } from './routes/users/user.service';
import { BindRoutes } from './routes';

const APP_CONFIG = config.get('app');
const JWT_CONFIG = config.get('jwt');
const app = new Koa();
const userService = new UserService();

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

// Bind User
app.use(async (ctx, next) => {
  const authHeader = ctx.request.headers['Authorization'];
  let token;
  if (authHeader) {
    token = authHeader.split(' ')[1];
    try {
      var decoded = jwt.verify(token, JWT_CONFIG.secret);
      console.log('DECODED', decoded);
      ctx.user = await userService.byId(decoded.userId);
    } catch (e) {}
  }
  await next();
});

// Router
BindRoutes(app);

// Listener
app.listen(APP_CONFIG.port, APP_CONFIG.host, () => {
  console.log(`Listening on ${APP_CONFIG.host}:${APP_CONFIG.port}`);
});
