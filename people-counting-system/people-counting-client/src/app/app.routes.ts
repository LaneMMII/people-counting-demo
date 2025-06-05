import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'device',
    pathMatch: 'full',
  },
  {
    path: 'device',
    loadComponent: () =>
      import('./device/device.page').then((m) => m.DevicePage),
  },
  {
    path: 'location',
    loadComponent: () => import('./location/location.page').then( m => m.LocationPage)
  },
  {
    path: 'add-device',
    loadComponent: () => import('./add-device/add-device.page').then( m => m.AddDevicePage)
  },
  {
    path: 'add-location',
    loadComponent: () => import('./add-location/add-location.page').then( m => m.AddLocationPage)
  },
  {
    path: 'edit-device/:id',
    loadComponent: () => import('./edit-device/edit-device.page').then( m => m.EditDevicePage)
  },
  {
    path: 'edit-location/:id',
    loadComponent: () => import('./edit-location/edit-location.page').then( m => m.EditLocationPage)
  },

];
