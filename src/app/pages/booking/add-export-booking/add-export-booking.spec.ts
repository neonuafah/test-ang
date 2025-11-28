import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExportBooking } from './add-export-booking';

describe('AddExportBooking', () => {
  let component: AddExportBooking;
  let fixture: ComponentFixture<AddExportBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExportBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExportBooking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
