import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DeviceService, Device } from '../services/device.service';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';

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
  IonCheckbox
  } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  addCircle,
  eyeOutline,
  createOutline,
  trashOutline,
  warningOutline
} from 'ionicons/icons';

import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.page.html',
  styleUrls: ['./edit-device.page.scss'],
  standalone: true,
  imports: [
  CommonModule,
  FormsModule,
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
  IonCheckbox]
})

export class EditDevicePage implements OnInit {
  device: Partial<Device> = { name: '', locationId: 0, active: false };
  locations$!: Observable<any[]>;
  deviceId!: number;

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {
    addIcons({
      addCircle,
      eyeOutline,
      createOutline,
      trashOutline,
      warningOutline
    });
  }

  ngOnInit() {
    this.locations$ = this.locationService.getLocations();


    this.deviceId = Number(this.route.snapshot.paramMap.get('id'));
    this.deviceService.getDevice(this.deviceId).subscribe({
      next: dev => this.device = dev,
      error: err => {
        // TODO: Show error to user
        console.error('Failed to load device', err);
      }
    });
  }

  updateDevice() {
    if (!this.device.name || !this.device.locationId) return;
    this.deviceService.updateDevice(this.deviceId, this.device as Device).subscribe({
      next: () => this.router.navigate(['/device']),
      error: err => {
        // TODO: Show error to user
        console.error('Failed to update device', err);
      }
    });
  }
}
