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
  IonLabel,
  IonItem,
  IonText,
  IonNote,
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
  device = { name: '', location: '', active: false };
  locations$!: Observable<any[]>; 

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

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          // Logic to fetch the device details by ID
          
        }
  }

  updateDevice() {
    // Logic to update the device
    console.log('Device updated');
  }
}
