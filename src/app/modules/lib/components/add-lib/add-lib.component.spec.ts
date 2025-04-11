import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLibComponent } from './add-lib.component';

describe('AddLibComponent', () => {
  let component: AddLibComponent;
  let fixture: ComponentFixture<AddLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
