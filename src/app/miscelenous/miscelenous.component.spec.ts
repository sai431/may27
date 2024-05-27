import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscelenousComponent } from './miscelenous.component';

describe('MiscelenousComponent', () => {
  let component: MiscelenousComponent;
  let fixture: ComponentFixture<MiscelenousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiscelenousComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MiscelenousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
