import Router from 'koa-router';
import { getAggregatedCountController } from './count.controller';
import { get } from 'http';

export const router = new Router({
  prefix: '/count',
});

router.get('/', getAggregatedCountController);