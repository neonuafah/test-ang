import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarRegistrationForm } from './add-car-registration-form';

describe('AddCarRegistrationForm', () => {
  let component: AddCarRegistrationForm;
  let fixture: ComponentFixture<AddCarRegistrationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCarRegistrationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarRegistrationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
