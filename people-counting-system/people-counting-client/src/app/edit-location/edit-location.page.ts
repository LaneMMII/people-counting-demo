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
  IonCheckbox} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  addCircle,
  eyeOutline,
  createOutline,
  trashOutline,
  warningOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.page.html',
  styleUrls: ['./edit-location.page.scss'],
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
export class EditLocationPage implements OnInit {
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

  updateLocation() {
    // Logic to update the location
    console.log('Location updated');
  }
}
