import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { LocationService, Location } from '../services/location.service';

import { addIcons } from 'ionicons';
import {
  addCircle,
  eyeOutline,
  createOutline,
  trashOutline,
  warningOutline,
} from 'ionicons/icons';

import { switchMap, catchError, tap } from 'rxjs/operators';

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

import { ToastService } from '../services/toast.service';

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
export class LocationPage {
  locations$: Observable<Location[]> = this.locationService.getLocations();

  constructor(
    private locationService: LocationService,
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

  deleteLocation(location: Location) {
    this.locationService
      .deleteLocation(location.id!)
      .pipe(
        tap(() =>
          this.toastService.presentToastSuccess(
            'Location deleted successfully!'
          )
        ),
        switchMap(() => this.locationService.getLocations()),
        catchError((error) => {
          console.error('Error deleting location:', error);
          this.toastService.presentToastError(
            error,
            'Failed to delete location'
          );
          return of([]);
        })
      )
      .subscribe((locations) => {
        this.locations$ = of(locations);
      });
  }
}
