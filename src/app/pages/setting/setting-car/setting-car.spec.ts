import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCar } from './setting-car';

describe('SettingCar', () => {
  let component: SettingCar;
  let fixture: ComponentFixture<SettingCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingCar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingCar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
