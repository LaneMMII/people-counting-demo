import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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

import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.page.html',
  styleUrls: ['./edit-location.page.scss'],
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
export class EditLocationPage implements OnInit {
  locationId: number = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
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

  location$ = of({} as Location);
  ngOnInit() {
    this.location$ = this.locationService.getLocation(this.locationId).pipe(
      catchError((error) => {
        console.error('Failed to load location:', error);
        this.router.navigate(['/location']);
        return of({} as Location);
      })
    );
  }

  updateLocation(name: string, address: string) {
    this.locationService
      .updateLocation(this.locationId, {
        id: this.locationId,
        name,
        address,
      } as Location)
      .pipe(
        tap(() => {
          this.toastService.presentToastSuccess(
            'Location updated successfully!'
          );
          this.router.navigate(['/location']);
        }),
        catchError((err) => {
          console.error('Failed to update location', err);
          this.toastService.presentToastError(err, 'Failed to update location');
          return of(undefined);
        })
      )
      .subscribe();
  }
}
