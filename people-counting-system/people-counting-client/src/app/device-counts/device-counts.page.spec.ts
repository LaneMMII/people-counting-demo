import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceCountsPage } from './device-counts.page';

describe('DeviceCountsPage', () => {
  let component: DeviceCountsPage;
  let fixture: ComponentFixture<DeviceCountsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
