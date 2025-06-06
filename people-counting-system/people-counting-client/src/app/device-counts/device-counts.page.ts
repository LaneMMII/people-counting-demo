import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgCharts } from 'ag-charts-angular';

import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonList,
  IonLabel,
  IonSelect,
  IonIcon,
  IonDatetime,
  IonText, 
  IonSelectOption,
} from '@ionic/angular/standalone';

import { refreshOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-device-counts',
  templateUrl: './device-counts.page.html',
  styleUrls: ['./device-counts.page.scss'],
  standalone: true,
  imports: [
    AgCharts,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule,
    IonButton,
    IonMenuButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonList,
    IonLabel,
    IonSelect,
    IonIcon,
    IonDatetime,
    IonText,
    IonSelectOption
  ],
})
export class DeviceCountsPage implements OnInit {
  startDate: string = new Date().toISOString();
  endDate: string = new Date().toISOString();

  aggregate: 'minute' | 'hour' | 'day' | 'week' = 'minute';

  showStartPicker = false;
  showEndPicker = false;

  // Sample chart options, needs replaced later with actual data
chartOptions = {

};
  constructor() { 
    addIcons({
      refreshOutline
    });
  }

  ngOnInit() {}
}