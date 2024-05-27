import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-available',
  templateUrl: './service-available.component.html',
  styleUrl: './service-available.component.css'
})
export class ServiceAvailableComponent {
  constructor(private router: Router) { }

  navigateToService(service: string): void {
    this.router.navigate([`/${service}`]);
  }

}
