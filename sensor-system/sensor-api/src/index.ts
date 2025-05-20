import Koa from 'koa';
import Router from 'koa-router';
import { Pool } from 'pg';

const app = new Koa();
const router = new Router();

// Replace with your actual database connection details
const pool = new Pool({
  user: 'your_db_user',
  host: 'your_db_host',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

router.get('/sensors', async (ctx) => {
  try {
    const result = await pool.query('SELECT * FROM sensors'); // Assuming you have a 'sensors' table
    ctx.body = result.rows;
  } catch (err) {
    console.error(err);
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
