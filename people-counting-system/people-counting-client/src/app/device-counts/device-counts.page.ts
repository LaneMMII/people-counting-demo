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

import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Device } from '../services/device.service';

type CountAggregate = 'minute' | 'hour' | 'day' | 'week';

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
  startDate: string = new Date(new Date().setHours(0, 0, 0, 0)).toISOString(); // beginning of today
  endDate: string = new Date().toISOString(); // now
  deviceId: number
  deviceName: string | undefined;
  aggregate: CountAggregate = 'hour'; // default aggregation
  device$!: Observable<Device>;

  showStartPicker = false;
  showEndPicker = false;

  // Sample chart options, needs replaced later with actual data
  chartOptions: any = {};
  errorMsg: string | null = null;

  constructor(  
    private route: ActivatedRoute,  
    private countService: CountService,  
    private deviceService: DeviceService,  
    private router: Router  
  ) {  
    addIcons({  
      refreshOutline,  
      arrowBack,  
    });  

    this.deviceId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.deviceId)) {
    this.router.navigate(['/device']);
    }  
  }

onRefresh() {  
    this.countService  
      .getCountsByDevice(  
        this.deviceId,  
        this.startDate,  
        this.endDate,  
        this.aggregate  
      )  
      .pipe(  
        map((res) => this.mapCountsToChart(res)),  
        catchError((error) => {  
          console.error(error);  
          return of({});  
        })  
      )  
      .subscribe((chartOptions) => {  
        this.chartOptions = chartOptions;  
      });  
  }  
  
mapCountsToChart(res: CountResponse) {
  if (!res || !Array.isArray(res.counts)) {
    return {
    data: [],
    series: [
      { type: 'line', xKey: 'x', yKey: 'in', yName: 'In' },
      { type: 'line', xKey: 'x', yKey: 'out', yName: 'Out' }
    ],
    axes: [
      { type: 'time', position: 'bottom', title: { text: 'Time' } },
      { type: 'number', position: 'left', title: { text: 'Count' } }
    ]
    };
  }
  return {
    data: res.counts.map(c => ({
    x: new Date(c.timestamp),
    in: c.in,
    out: c.out
    })),
    series: [
    { type: 'line', xKey: 'x', yKey: 'in', yName: 'In' },
    { type: 'line', xKey: 'x', yKey: 'out', yName: 'Out' }
    ],
    axes: [
    { type: 'time', position: 'bottom', title: { text: 'Time' } },
    { type: 'number', position: 'left', title: { text: 'Count' } }
    ]
  };
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
    this.deviceName = device?.name || 'Unknown';
  });

    this.onRefresh();  
  }  
}