import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-location-counts',
  templateUrl: './location-counts.page.html',
  styleUrls: ['./location-counts.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LocationCountsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
