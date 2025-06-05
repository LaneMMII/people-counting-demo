import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDevicePage } from './edit-device.page';

describe('EditDevicePage', () => {
  let component: EditDevicePage;
  let fixture: ComponentFixture<EditDevicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
