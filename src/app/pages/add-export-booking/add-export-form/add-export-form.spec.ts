import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExportForm } from './add-export-form';

describe('AddExportForm', () => {
  let component: AddExportForm;
  let fixture: ComponentFixture<AddExportForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExportForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExportForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
