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

import { Observable, of } from 'rxjs';

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
export class DevicePage implements OnInit {
  devices$!: Observable<any[]>;

  constructor() {
    addIcons({
      addCircle,
      eyeOutline,
      createOutline,
      trashOutline,
      warningOutline,
    });
  }

  ngOnInit() {
    this.devices$ = of([
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
    ]);
  }
}
