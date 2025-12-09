import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerVehicle } from './partner-vehicle';

describe('PartnerVehicle', () => {
  let component: PartnerVehicle;
  let fixture: ComponentFixture<PartnerVehicle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerVehicle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerVehicle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
