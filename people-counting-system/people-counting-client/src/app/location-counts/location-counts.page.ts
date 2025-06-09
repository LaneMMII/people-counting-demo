import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AgCharts } from 'ag-charts-angular';

import { 
  IonButton, 
  IonDatetimeButton,
  IonModal,
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
  templateUrl: './location-counts.page.html',
  styleUrls: ['./location-counts.page.scss'],
  standalone: true,
  imports: [
    AgCharts,
    IonDatetimeButton,
    IonContent, 
    IonHeader, 
    IonModal,
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
export class LocationCountsPage implements OnInit {
  startDate: string = new Date().toISOString();
  endDate: string = new Date().toISOString();
  locationId: number | undefined;
  locationName: string | undefined;

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
    this.locationId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Loaded counts for location ID:', this.locationId);

    this.locationName = `location #${this.locationId}`;  //This will need changed when service is implemented
  }
}