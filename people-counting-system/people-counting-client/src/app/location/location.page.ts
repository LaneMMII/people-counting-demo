import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { addIcons } from 'ionicons';
import {
  addCircle,
  eyeOutline,
  createOutline,
  trashOutline,
  warningOutline,
} from 'ionicons/icons';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonNote,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
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
export class LocationPage implements OnInit {
  locations$!: Observable<any[]>;

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
}
