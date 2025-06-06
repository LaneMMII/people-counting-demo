import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationCountsPage } from './location-counts.page';

describe('LocationCountsPage', () => {
  let component: LocationCountsPage;
  let fixture: ComponentFixture<LocationCountsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationCountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
