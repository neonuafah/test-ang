import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDomesticForm } from './add-domestic-form';

describe('AddDomesticForm', () => {
  let component: AddDomesticForm;
  let fixture: ComponentFixture<AddDomesticForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDomesticForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDomesticForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
