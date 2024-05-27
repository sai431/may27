import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAvailableComponent } from './service-available.component';

describe('ServiceAvailableComponent', () => {
  let component: ServiceAvailableComponent;
  let fixture: ComponentFixture<ServiceAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceAvailableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
