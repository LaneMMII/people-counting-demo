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
    path: 'device/add',
    loadComponent: () =>
      import('./add-device/add-device.page').then((m) => m.AddDevicePage),
  },
  {
    path: 'location/add',
    loadComponent: () =>
      import('./add-location/add-location.page').then((m) => m.AddLocationPage),
  },
  {
    path: 'device/:id/edit',
    loadComponent: () =>
      import('./edit-device/edit-device.page').then((m) => m.EditDevicePage),
  },
  {
    path: 'location/:id/edit',
    loadComponent: () =>
      import('./edit-location/edit-location.page').then(
        (m) => m.EditLocationPage
      ),
  },
  {
    path: 'device/:id/count',
    loadComponent: () =>
      import('./device-counts/device-counts.page').then(
        (m) => m.DeviceCountsPage
      ),
  },
  {
    path: 'location/:id/count',
    loadComponent: () =>
      import('./location-counts/location-counts.page').then(
        (m) => m.LocationCountsPage
      ),
  },


];
