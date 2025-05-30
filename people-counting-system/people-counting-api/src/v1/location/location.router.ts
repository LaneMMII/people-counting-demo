import Router from 'koa-router';

// import controllers here
import {
  createLocationController,
  getAllLocationsController,
  getLocationByIdController,
  updateLocationController,
  deleteLocationController,
} from './location.controller';

export const router = new Router({
  prefix: '/location',
});

router.post('/', createLocationController)
      .get('/', getAllLocationsController)
      .get('/:id', getLocationByIdController)
      .put('/:id', updateLocationController)
      .delete('/:id', deleteLocationController);