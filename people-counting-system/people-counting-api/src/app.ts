import Koa from 'koa';
import Router from 'koa-router';
import { config } from './config';

const app = new Koa();
const router = new Router();

router.get('/health', async (ctx) => {
  ctx.body = { status: 'OK' };
});

app.use(router.routes()).use(router.allowedMethods());

export const startServer = () => {
  app.listen(config.api.port, config.api.host, () => {
    console.log(
      `Server listening on http://${config.api.host}:${config.api.port}`,
    );
  });
};
