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
  startDate: string = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  endDate: string = new Date().toISOString();
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
        this.startDate,
        this.endDate,
        this.aggregate
      )
      .pipe(
        map((res) => this.mapCountsToChart(Array.isArray(res) ? res[0] : res)),
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
      data: res.counts.map((c) => ({
        x: moment.utc(c.timestamp).toDate(),
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
