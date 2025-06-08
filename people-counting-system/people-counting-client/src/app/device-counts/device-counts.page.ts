import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgCharts } from 'ag-charts-angular';

import { 
  IonDatetimeButton,
  IonModal,
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
  IonSelectOption,
} from '@ionic/angular/standalone';

import { ActivatedRoute, Router } from '@angular/router';

import { refreshOutline, arrowBack } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-device-counts',
  templateUrl: './device-counts.page.html',
  styleUrls: ['./device-counts.page.scss'],
  standalone: true,
  imports: [
    IonDatetimeButton,
    IonModal,
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
    IonSelectOption
  ],
})
export class DeviceCountsPage implements OnInit {
  startDate: string = new Date().toISOString();
  endDate: string = new Date().toISOString();
  deviceId: number | undefined;
  deviceName: string | undefined;

  aggregate: 'minute' | 'hour' | 'day' | 'week' = 'minute';

  showStartPicker = false;
  showEndPicker = false;

  // Sample chart options, needs replaced later with actual data
chartOptions = {

};
  constructor(private route: ActivatedRoute, private router: Router) { 
    addIcons({
      refreshOutline,
      arrowBack
    });
  }

  onRefresh() {
    console.log('Refreshing chart with:');
    console.log('Start Date:', this.startDate);
    console.log('End Date:', this.endDate);
    console.log('Aggregate:', this.aggregate);
  }
  ngOnInit() {
    this.deviceId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Loaded counts for device ID:', this.deviceId);

    this.deviceName = `Device #${this.deviceId}`;  //This will need changed when service is implemented
  }
}