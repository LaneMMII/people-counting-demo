import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonLabel,
  IonItem,
  IonText,
  IonNote,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  addCircle,
  eyeOutline,
  createOutline,
  trashOutline,
  warningOutline,
} from 'ionicons/icons';

import { type Observable, of } from 'rxjs';
import { DeviceService, type Device } from '../services/device.service';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonList,
    IonLabel,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonButtons,
    IonText,
    IonNote,
  ],
})
export class DevicePage {
  devices$: Observable<Device[]> = this.deviceService.getDevices();

  constructor(
    private deviceService: DeviceService,
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

  deleteDevice(id: number) {
    this.deviceService
      .deleteDevice(id)
      .pipe(
        tap(() =>
          this.toastService.presentToastSuccess('Device deleted successfully!')
        ),
        switchMap(() => this.deviceService.getDevices()),
        catchError((error) => {
          console.error('Error deleting device:', error);
          this.toastService.presentToastError(error, 'Failed to delete device');
          return of([]);
        })
      )
      .subscribe((devices) => {
        this.devices$ = of(devices);
      });
  }
}
