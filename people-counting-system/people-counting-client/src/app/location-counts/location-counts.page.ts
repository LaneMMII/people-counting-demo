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
import { CountService } from '../services/count.service';
import { CountResponse, CountAggregate } from '../interface/count.interface';
import { LocationService } from '../services/location.service';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import moment from 'moment';

const now = moment();
const fivePm = moment().set({ hour: 17, minute: 0, second: 0, millisecond: 0 });

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
    IonSelectOption,
  ],
})
export class LocationCountsPage implements OnInit {
  startDate: string = moment()
    .set({ hour: 9, minute: 0, second: 0, millisecond: 0 })
    .format('YYYY-MM-DDTHH:mm');

  endDate: string = now.isAfter(fivePm)
    ? fivePm.format('YYYY-MM-DDTHH:mm')
    : now.format('YYYY-MM-DDTHH:mm');

  locationId: number | undefined;
  aggregate: CountAggregate = 'hour';

  showStartPicker = false;
  showEndPicker = false;

  chartOptions: any = {};
  errorMsg: string | null = null;

  location$: Observable<{ name: string } | undefined> = of();

  constructor(
    private route: ActivatedRoute,
    private countService: CountService,
    private locationService: LocationService,
    private router: Router
  ) {
    addIcons({
      refreshOutline,
      arrowBack,
    });

    this.locationId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onRefresh() {
    this.errorMsg = null;
    if (moment.utc(this.endDate).isBefore(moment.utc(this.startDate))) {
      this.errorMsg =
        "'End' date must be greater than or equal to 'Start' date.";
      return;
    }

    if (!this.locationId) {
      return;
    }
    this.countService
      .getCountsByLocation(
        this.locationId,
        moment(this.startDate).utc().toISOString(),
        moment(this.endDate).utc().toISOString(),
        this.aggregate
      )
      .pipe(
        map((res) => this.mapCountsToChart(res)),
        catchError((error) => {
          console.error(error);
          this.errorMsg = 'Failed to load counts';
          return of({});
        })
      )
      .subscribe((chartOptions) => {
        this.chartOptions = chartOptions;
      });
  }

  mapCountsToChart(res: CountResponse[] | CountResponse) {
    const countsByTime: Record<string, { in: number; out: number }> = {};

    const responses = Array.isArray(res) ? res : [res];
    for (const device of responses) {
      for (const c of device.counts) {
        const key = c.timestamp;
        if (!countsByTime[key]) {
          countsByTime[key] = { in: 0, out: 0 };
        }
        countsByTime[key].in += c.in;
        countsByTime[key].out += c.out;
      }
    }

    const data = Object.entries(countsByTime).map(([timestamp, value]) => ({
      x: new Date(timestamp),
      in: value.in,
      out: value.out,
    }));

    return {
      data,
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
    if (!this.locationId) {
      this.router.navigate(['/location']);
      return;
    }
    this.location$ = this.locationService.getLocation(this.locationId).pipe(
      catchError((error) => {
        console.error('Failed to load location:', error);
        this.router.navigate(['/location']);
        return of({ name: 'Unknown' });
      })
    );

    this.onRefresh();
  }
}
