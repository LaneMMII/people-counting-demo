import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DeviceService, Device } from '../services/device.service';
import { Router } from '@angular/router';

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
    private router: Router
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
    this.locations$ = of([
      {
        id: 1,
        name: 'American Eagle',
        address: '123 Mall St',
        created: '2025-06-01T01:19:25.294Z',
        updated: '2025-06-01T01:19:25.294Z',
        deleted: null,
      },
      {
        id: 2,
        name: 'Woods Grocery',
        address: '456 Market Ave',
        created: '2025-06-01T01:19:25.294Z',
        updated: '2025-06-01T01:19:25.294Z',
        deleted: null,
      },
      {
        id: 3,
        name: 'Hot Topic',
        address: '789 Fashion Blvd',
        created: '2025-06-01T01:19:25.294Z',
        updated: '2025-06-01T01:19:25.294Z',
        deleted: null,
      },
      {
        id: 4,
        name: 'Game Stop',
        address: '101 Gaming Ln',
        created: '2025-06-01T01:19:25.294Z',
        updated: '2025-06-01T01:19:25.294Z',
        deleted: null,
      },
      {
        id: 5,
        name: 'Best Buy',
        address: '202 Tech Rd',
        created: '2025-06-01T01:19:25.294Z',
        updated: '2025-06-01T01:19:25.294Z',
        deleted: null,
      },
      {
        id: 6,
        name: 'Target',
        address: '303 Retail Dr',
        created: '2025-06-01T01:19:25.294Z',
        updated: '2025-06-01T01:19:25.294Z',
        deleted: null,
      },
    ]);
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
