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
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    CommonModule,
    FormsModule,
  ],
})
export class DevicePage implements OnInit {
  devices = [
    { name: 'American Eagle Sensor 1', bold: true },
    { name: 'American Eagle Sensor 2', bold: true },
    { name: 'Woods Sensor 1', bold: true },
    { name: 'Woods Sensor 2', bold: true },
    { name: 'Gap Sensor 1', bold: true },
    { name: 'Gap Sensor 2', bold: true },
    { name: 'Build a Bear Sensor 1', bold: true },
    { name: 'Build a Bear Sensor 2', bold: true },
  ];

  constructor() {
    addIcons({ addCircle });
  }

  ngOnInit() {}
}
