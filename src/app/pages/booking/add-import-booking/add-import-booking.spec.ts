import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImportBooking } from './add-import-booking';

describe('AddImportBooking', () => {
  let component: AddImportBooking;
  let fixture: ComponentFixture<AddImportBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddImportBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImportBooking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
