import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import { config } from './config';
import { router as v1Router } from './v1/router';

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

router.get('/health', async (ctx) => {
  ctx.body = { status: 'OK' };
});

app.use(router.routes()).use(router.allowedMethods());
app.use(v1Router.routes()).use(v1Router.allowedMethods());

export const startServer = () => {
  app.listen(config.api.port, config.api.host, () => {
    console.log(
      `Server listening on http://${config.api.host}:${config.api.port}`,
    );
  });
};
