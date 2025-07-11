import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LocationService, type Location } from '../services/location.service';
import { Router } from '@angular/router';

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
  IonCardTitle,
  IonInput,
  IonCardContent,
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
} from '@ionic/angular/standalone';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.page.html',
  styleUrls: ['./add-location.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCardTitle,
    IonInput,
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
  ],
})
export class AddLocationPage {
  location: Partial<Location> = { name: undefined, address: undefined };

  constructor(
    private locationService: LocationService,
    private router: Router,
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

  addLocation() {
    this.locationService
      .createLocation(this.location as Location)
      .pipe(
        tap(() => {
          this.toastService.presentToastSuccess('Location added successfully!');
          this.router.navigate(['/location']);
        }),
        catchError((err) => {
          this.toastService.presentToastError(err, 'Failed to add location');
          console.error('Failed to add location', err);
          return of(undefined);
        })
      )
      .subscribe();
  }
}
