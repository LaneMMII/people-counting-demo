import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  IonLabel,
  IonMenuButton,
  IonButtons,
  IonText,
  IonCard,
  IonCardHeader,
  IonNote
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
    IonLabel,
    IonMenuButton,
    IonButtons,
    IonText,
    IonCard,
    IonCardHeader,
    IonNote
  ]
})
export class EditLocationPage implements OnInit {
  location = { name: '', address: '' };

  // Mock locations array (replace with service in real app)
  private locations = [
    { id: 1, name: 'American Eagle', address: '123 Mall St' },
    { id: 2, name: 'Woods Grocery', address: '456 Market Ave' },
    { id: 3, name: 'Hot Topic', address: '789 Fashion Blvd' },
    { id: 4, name: 'Game Stop', address: '101 Gaming Ln' },
    { id: 5, name: 'Best Buy', address: '202 Tech Rd' },
    { id: 6, name: 'Target', address: '303 Retail Dr' },
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.locations.find(loc => loc.id === id);
    if (found) {
      this.location = { ...found };
    }
  }

  updateLocation() {
    // TODO: Implement the logic to update the location
    console.log("Location updated", this.location);
  }
}