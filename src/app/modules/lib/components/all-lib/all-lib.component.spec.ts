import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLibComponent } from './all-lib.component';

describe('AllLibComponent', () => {
  let component: AllLibComponent;
  let fixture: ComponentFixture<AllLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
