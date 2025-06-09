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
  device = { name: '', location: 0, active: false };
  locations$!: Observable<any[]>;

  // Mock devices and locations need updated to use actual data from db
  private devices = [
    {
      id: 1,
      name: 'American Eagle East Door',
      locationId: 1,
      active: true,
      created: '2025-06-01T01:19:25.296Z',
      updated: '2025-06-01T01:19:25.296Z',
      deleted: null,
    },
    {
      id: 2,
      name: 'American Eagle West Door',
      locationId: 1,
      active: true,
      created: '2025-06-01T01:19:25.296Z',
      updated: '2025-06-01T01:19:25.296Z',
      deleted: null,
    },
    {
      id: 3,
      name: 'Woods Grocery North Door',
      locationId: 2,
      active: true,
      created: '2025-06-01T01:19:25.296Z',
      updated: '2025-06-01T01:19:25.296Z',
      deleted: null,
    },
    {
      id: 4,
      name: 'Woods Grocery South Door',
      locationId: 2,
      active: true,
      created: '2025-06-01T01:19:25.296Z',
      updated: '2025-06-01T01:19:25.296Z',
      deleted: null,
    },
    {
      id: 5,
      name: 'Hot Topic',
      locationId: 3,
      active: true,
      created: '2025-06-01T01:19:25.296Z',
      updated: '2025-06-01T01:19:25.296Z',
      deleted: null,
    },
    {
      id: 6,
      name: 'Game Stop',
      locationId: 4,
      active: true,
      created: '2025-06-01T01:19:25.296Z',
      updated: '2025-06-01T01:19:25.296Z',
      deleted: null,
    },
    {
      id: 7,
      name: 'Best Buy East Door',
      locationId: 5,
      active: true,
      created: '2025-06-01T01:19:25.296Z',
      updated: '2025-06-01T01:19:25.296Z',
      deleted: null,
    },
    {
      id: 8,
      name: 'Best Buy West Door',
      locationId: 5,
      active: true,
      created: '2025-06-01T01:19:25.296Z',
      updated: '2025-06-01T01:19:25.296Z',
      deleted: null,
    },
    {
      id: 9,
      name: 'Target East Door',
      locationId: 6,
      active: true,
      created: '2025-06-01T01:19:25.296Z',
      updated: '2025-06-01T01:19:25.296Z',
      deleted: null,
    },
    {
      id: 10,
      name: 'Target West Door',
      locationId: 6,
      active: true,
      created: '2025-06-01T01:19:25.296Z',
      updated: '2025-06-01T01:19:25.296Z',
      deleted: null,
    },
  ];

  constructor(private route: ActivatedRoute) {
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

const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.devices.find(dev => dev.id === id);
    if (found) {
      this.device = {
        name: found.name,
        location: found.locationId,
        active: found.active
      };
    }
  }

  updateDevice() {
    // Logic to update the device
    console.log('Device updated', this.device);
  }
}
