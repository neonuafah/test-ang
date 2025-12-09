import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartnerVehicle } from './add-partner-vehicle';

describe('AddPartnerVehicle', () => {
  let component: AddPartnerVehicle;
  let fixture: ComponentFixture<AddPartnerVehicle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPartnerVehicle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPartnerVehicle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
