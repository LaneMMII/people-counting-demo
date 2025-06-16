import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DeviceService, type Device } from '../services/device.service';
import { Router } from '@angular/router';
import { LocationService, type Location } from '../services/location.service';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCard,
  IonInput,
  IonSelectOption,
  IonSelect,
  IonCheckbox,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  addCircle,
  eyeOutline,
  createOutline,
  trashOutline,
  warningOutline,
} from 'ionicons/icons';

import { type Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCardTitle,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCardContent,
    CommonModule,
    FormsModule,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonList,
    IonMenuButton,
    IonButtons,
    IonCard,
    IonCardHeader,
  ],
})
export class AddDevicePage {
  device: Partial<Device> = {
    name: undefined,
    locationId: undefined,
    active: false,
  };
  locations$: Observable<Location[]> = this.locationService.getLocations();

  constructor(
    private deviceService: DeviceService,
    private router: Router,
    private locationService: LocationService,
    private toastService: ToastService
  ) {
    addIcons({
      addCircle,
      eyeOutline,
      createOutline,
      trashOutline,
      warningOutline,
    });
  }

  addDevice() {
    this.deviceService
      .createDevice(this.device as Device)
      .pipe(
        tap(() => {
          this.toastService.presentToastSuccess('Device added successfully!');
          this.router.navigate(['/device']);
        }),
        catchError((err) => {
          console.error('Failed to add device', err);
          this.toastService.presentToastError(err, 'Failed to add device');
          return of(undefined);
        })
      )
      .subscribe();
  }
}
