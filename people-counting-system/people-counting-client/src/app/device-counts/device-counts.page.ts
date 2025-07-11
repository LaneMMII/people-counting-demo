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
import { CountService } from '../services/count.service';
import { CountResponse, CountAggregate } from '../interface/count.interface';

import { refreshOutline, arrowBack } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { map, catchError } from 'rxjs/operators';
import { type Observable, of, tap } from 'rxjs';
import { type Device } from '../services/device.service';

import moment from 'moment';

const now = moment();
const fivePm = moment().set({ hour: 17, minute: 0, second: 0, millisecond: 0 });

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
    IonSelectOption,
  ],
})
export class DeviceCountsPage implements OnInit {
  startDate: string = moment()
    .set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
    .format('YYYY-MM-DDTHH:mm');

  endDate: string = now.isAfter(fivePm)
    ? fivePm.format('YYYY-MM-DDTHH:mm')
    : now.format('YYYY-MM-DDTHH:mm');

  deviceId: number;
  deviceName: string | undefined;
  aggregate: CountAggregate = 'hour'; // default aggregation
  device$: Observable<Device | undefined> = of();

  showStartPicker = false;
  showEndPicker = false;

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
    this.errorMsg = null;
    if (moment.utc(this.endDate).isBefore(moment.utc(this.startDate))) {
      this.errorMsg =
        "'End' date must be greater than or equal to 'Start' date.";
      return;
    }

    this.countService
      .getCountsByDevice(
        this.deviceId,
        moment(this.startDate).utc().toISOString(),
        moment(this.endDate).utc().toISOString(),
        this.aggregate
      )
      .pipe(
        map((res) => this.mapCountsToChart(Array.isArray(res) ? res[0] : res)),
        tap((chartOptions) => {
          this.chartOptions = chartOptions;
        }),
        catchError((error) => {
          console.error(error);
          return of({});
        })
      )
      .subscribe();
  }

  mapCountsToChart(res: CountResponse) {
    if (!res || !Array.isArray(res.counts)) {
      return {
        data: [],
        series: [
          { type: 'line', xKey: 'x', yKey: 'in', yName: 'In' },
          { type: 'line', xKey: 'x', yKey: 'out', yName: 'Out' },
        ],
        axes: [
          { type: 'time', position: 'bottom', title: { text: 'Time' } },
          { type: 'number', position: 'left', title: { text: 'Count' } },
        ],
      };
    }
    return {
      data: res.counts.map((c: any) => ({
        x: moment.utc(c.timestamp).local().toDate(),
        in: c.in,
        out: c.out,
      })),
      series: [
        { type: 'line', xKey: 'x', yKey: 'in', yName: 'In' },
        { type: 'line', xKey: 'x', yKey: 'out', yName: 'Out' },
      ],
      axes: [
        { type: 'time', position: 'bottom', title: { text: 'Time' } },
        { type: 'number', position: 'left', title: { text: 'Count' } },
      ],
    };
  }

  ngOnInit() {
    this.device$ = this.deviceService.getDevice(this.deviceId).pipe(
      catchError((error) => {
        console.error('Failed to load device:', error);
        this.router.navigate(['/device']);
        return of(undefined);
      })
    );

    this.onRefresh();
  }
}
