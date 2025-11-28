import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDomesticBooking } from './add-domestic-booking';

describe('AddDomesticBooking', () => {
  let component: AddDomesticBooking;
  let fixture: ComponentFixture<AddDomesticBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDomesticBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDomesticBooking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
