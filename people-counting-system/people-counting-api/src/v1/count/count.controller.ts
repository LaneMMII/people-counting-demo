import { type Context } from 'koa';

import { getAllSample, getSampleById } from './count.service';

export const getAllSampleController = async (ctx: Context) => {
  const result = await getAllSample();

  ctx.body = {
    status: 'success',
    statusCode: 200,
    data: result,
  };
};

export const getSampleByIdController = async (ctx: Context) => {
  const { id } = ctx.params;

  const result = await getSampleById(Number(id));

  ctx.body = {
    status: 'success',
    statusCode: 200,
    data: result,
  };
};
