import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInitiativesComponent } from './all-initiatives.component';

describe('AllInitiativesComponent', () => {
  let component: AllInitiativesComponent;
  let fixture: ComponentFixture<AllInitiativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllInitiativesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllInitiativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
