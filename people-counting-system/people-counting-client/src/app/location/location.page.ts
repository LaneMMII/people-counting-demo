import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { Router } from '@angular/router';
import { LocationService, Location } from '../services/location.service';

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
  locations$!: Observable<Location[]>;

  constructor(private locationService: LocationService) {
    addIcons({
      addCircle,
      eyeOutline,
      createOutline,
      trashOutline,
      warningOutline,
    });
  }

  ngOnInit() {
    this.locations$ = this.locationService.getLocations();
  }

    deleteLocation(id?: number) {
    if (id === undefined) return;
    this.locationService.deleteLocation(id).subscribe({
      next: () => {
        this.locations$ = this.locationService.getLocations();
      },
      error: err => {
        // TODO: Show error to user
        console.error('Failed to delete location', err);
      }
    });
  }
}
