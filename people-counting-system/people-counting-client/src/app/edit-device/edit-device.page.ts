import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DeviceService, type Device } from '../services/device.service';
import { Router } from '@angular/router';
import { LocationService, type Location} from '../services/location.service';

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

import { type Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
  deviceId: number = Number(this.route.snapshot.paramMap.get('id'));  
  locations$: Observable<Location[]> = this.locationService.getLocations();  
  device$: Observable<Device> = of();
  device: Device = {} as Device;

  constructor(
    private deviceService: DeviceService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
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
    this.device$ = this.deviceService.getDevice(this.deviceId).pipe(  
      catchError((error) => {  
        // TODO: display error message to user  
        console.error('Failed to load device:', error);  
        this.router.navigate(['/device']);  
        return of({} as Device);  
      })  
    );  

    this.device$.subscribe(device => {  
      this.device = device;  
    });
  }  

  updateDevice(name: string, locationId: number, active: boolean) {  
    this.deviceService  
      .updateDevice(this.deviceId, {
        id: this.deviceId,
        name,
        locationId,
        active,
        created: this.device.created,
        updated: this.device.updated,
        deleted: this.device.deleted
      })
      .pipe(
        tap(() => this.router.navigate(['/device'])),
        catchError((err) => {
          // TODO: show error message to user
          console.error('Failed to add device', err);
          return of(undefined);
        })
      )
      .subscribe();
  }
}
