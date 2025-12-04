import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarRegistration } from './add-car-registration';

describe('AddCarRegistration', () => {
  let component: AddCarRegistration;
  let fixture: ComponentFixture<AddCarRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCarRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarRegistration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
