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
      { id: 1, name: 'American Eagle', address: '123 Mall St' },
      { id: 2, name: 'Woods Grocery', address: '456 Market Ave' },
      { id: 3, name: 'Hot Topic', address: '789 Fashion Blvd' },
      { id: 4, name: 'Game Stop', address: '101 Gaming Ln' },
      { id: 5, name: 'Best Buy', address: '202 Tech Rd' },
      { id: 6, name: 'Target', address: '303 Retail Dr' },
    ]);

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
