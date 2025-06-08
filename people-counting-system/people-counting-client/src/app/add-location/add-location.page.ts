import { Component, OnInit } from '@angular/core';
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
  IonMenuButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  } from '@ionic/angular/standalone';
import { add } from 'ionicons/icons';

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
    ]
})
export class AddLocationPage implements OnInit {
  location = {name: '', address: ''}

  constructor() {  
    addIcons({
      addCircle,
      eyeOutline,
      createOutline,
      trashOutline,
      warningOutline
    }); 
  }

  ngOnInit() {
  }

  addLocation() {
  //TODO: Implement the logic to add a new location
  console.log("Add Location button clicked");
  }

}
