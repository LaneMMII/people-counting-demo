import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LocationService, Location } from '../services/location.service';
import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import {
  addCircle,
  eyeOutline,
  createOutline,
  trashOutline,
  warningOutline
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
  ]
})
export class EditLocationPage implements OnInit {
  location: Partial<Location> = { name: '', address: '' };
  locationId!: number;

  constructor(    
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router) {  
    
      addIcons({
      addCircle,
      eyeOutline,
      createOutline,
      trashOutline,
      warningOutline
    }); 
  }

 ngOnInit() {
    this.locationId = Number(this.route.snapshot.paramMap.get('id'));
    this.locationService.getLocation(this.locationId).subscribe({
      next: loc => this.location = loc,
      error: err => {
        // TODO: Show error to user
        console.error('Failed to load location', err);
      }
    });
  }

  updateLocation() {
    if (!this.location.name || !this.location.address) return;
    this.locationService.updateLocation(this.locationId, this.location as Location).subscribe({
      next: () => this.router.navigate(['/location']),
      error: err => {
        // TODO: Show error to user
        console.error('Failed to update location', err);
      }
    });
  }
}