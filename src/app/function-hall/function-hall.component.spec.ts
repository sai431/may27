import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionHallComponent } from './function-hall.component';

describe('FunctionHallComponent', () => {
  let component: FunctionHallComponent;
  let fixture: ComponentFixture<FunctionHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionHallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunctionHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
