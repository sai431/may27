import { Component } from '@angular/core';
import { GithubService } from '../github.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.css'
})
export class TermsAndConditionsComponent implements OnInit {

  termsAndConditions: string = '';
  isChecked: boolean = false;
  loading: boolean = true;

  constructor(private githubService: GithubService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.termsAndConditions = await this.githubService.getTermsAndConditions('userName');
    } catch (error) {
      this.termsAndConditions = 'Failed to load terms and conditions.';
    } finally {
      this.loading = false;
    }
  }

  onCheckboxChange(event: Event): void {
    this.isChecked = (event.target as HTMLInputElement).checked;
  }


}
