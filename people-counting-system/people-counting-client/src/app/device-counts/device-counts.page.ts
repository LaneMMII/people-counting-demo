import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceService } from '../services/device.service';

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
import { CountService, CountResponse } from '../services/count.service';

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
  startDate: string = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days ago
  endDate: string = new Date().toISOString(); // now
  deviceId: number | undefined;
  deviceName: string | undefined;

  aggregate: 'minute' | 'hour' | 'day' | 'week' = 'hour';

  showStartPicker = false;
  showEndPicker = false;

  // Sample chart options, needs replaced later with actual data
  chartOptions: any = {};
  errorMsg: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private countService: CountService,
    private deviceService: DeviceService,) { 
    addIcons({
      refreshOutline,
      arrowBack
    });
  }
  onRefresh() {
    if (!this.deviceId) return;
    this.countService.getCountsByDevice(
      this.deviceId,
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
  this.deviceId = Number(this.route.snapshot.paramMap.get('id'));
  this.deviceName = this.route.snapshot.queryParamMap.get('name') || undefined;
  if (!this.deviceName && this.deviceId) {
    this.deviceService.getDevice(this.deviceId).subscribe(device => {
      this.deviceName = device?.name || 'Unknown';
    });
  }
   this.onRefresh();
  }
}