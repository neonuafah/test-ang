import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFixCost } from './add-fix-cost';

describe('AddFixCost', () => {
  let component: AddFixCost;
  let fixture: ComponentFixture<AddFixCost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFixCost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFixCost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
