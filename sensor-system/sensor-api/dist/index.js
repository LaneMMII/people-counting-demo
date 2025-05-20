import Koa from 'koa';
import Router from 'koa-router';
const app = new Koa();
const router = new Router();
router.get('/health', async (ctx) => {
    ctx.body = { status: 'OK' };
});
app.use(router.routes()).use(router.allowedMethods());
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
