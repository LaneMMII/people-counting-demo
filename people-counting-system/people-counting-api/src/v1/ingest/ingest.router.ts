import Router from 'koa-router';

// import controllers here
import { ingestSensorDataController } from './ingest.controller';

export const router = new Router({
  prefix: '/ingest',
});

router.post("/", ingestSensorDataController)
