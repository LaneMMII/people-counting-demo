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
import { CountService, CountResponse } from '../services/count.service';
import { LocationService } from '../services/location.service';

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
// ...existing code...
export class LocationCountsPage implements OnInit {
  startDate: string = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days ago
  endDate: string = new Date().toISOString(); // now
  locationId: number | undefined;
  locationName: string | undefined;

  aggregate: 'minute' | 'hour' | 'day' | 'week' = 'hour';

  showStartPicker = false;
  showEndPicker = false;

  chartOptions: any = {};
  errorMsg: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countService: CountService,
    private locationService: LocationService
  ) {
    addIcons({
      refreshOutline,
      arrowBack
    });
  }

  onRefresh() {
    if (!this.locationId) return;
    this.countService.getCountsByLocation(
      this.locationId,
      this.startDate,
      this.endDate,
      this.aggregate
    ).subscribe({
      next: (resArr) => {
        const res = Array.isArray(resArr) ? resArr[0] : resArr;
        this.errorMsg = null;
        this.chartOptions = this.mapCountsToChart(res);
      },
      error: err => {
        this.errorMsg = 'Failed to load counts';
        this.chartOptions = {};
      }
    });
  }

  mapCountsToChart(res: CountResponse) {
    if (!res || !Array.isArray(res.counts)) {
      return {
        data: [],
        series: [{ type: 'line', xKey: 'x', yKey: 'y', yName: 'Count' }],
        axes: [
          { type: 'time', position: 'bottom', title: { text: 'Time' } },
          { type: 'number', position: 'left', title: { text: 'Count' } }
        ]
      };
    }
    return {
      data: res.counts.map(c => ({ x: new Date(c.timestamp), y: c.count })),
      series: [{ type: 'line', xKey: 'x', yKey: 'y', yName: 'Count' }],
      axes: [
        { type: 'time', position: 'bottom', title: { text: 'Time' } },
        { type: 'number', position: 'left', title: { text: 'Count' } }
      ]
    };
  }

  ngOnInit() {
    this.locationId = Number(this.route.snapshot.paramMap.get('id'));
    this.locationName = this.route.snapshot.queryParamMap.get('name') || undefined;
    if (!this.locationName && this.locationId) {
      this.locationService.getLocation(this.locationId).subscribe(location => {
        this.locationName = location?.name || 'Unknown';
      });
    }
    this.onRefresh();
  }
}
