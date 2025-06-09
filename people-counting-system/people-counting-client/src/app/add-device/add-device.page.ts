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
  ]
})

export class AddDevicePage implements OnInit {
  device: Partial<Device> = { name: '', locationId: 0, active: false };
  locations$!: Observable<any[]>; 

  constructor(
    private deviceService: DeviceService,
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
  }

  addDevice() {
    // Ensure locationId is a number
    if (!this.device.name || !this.device.locationId) return;
    this.deviceService.createDevice(this.device as Device).subscribe({
      next: () => this.router.navigate(['/device']),
      error: err => {
        // TODO: Show error to user
        console.error('Failed to add device', err);
      }
    });
  }
}
