import { Component } from '@angular/core';
import { FlagComponent } from '../../shared/flag/flag.component';
import { Country } from '../../models/country.model';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FlagComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  country: Country = {
    name: '',
    flagPng: '',
    flagSvg: '',
  };

  constructor(private countriesService: CountriesService) {
    this.getRandomCountry();
  }

  getRandomCountry(): void {
    this.countriesService.getAll().subscribe((countries: Country[]) => {
      const randomIndex = Math.floor(Math.random() * countries.length);
      this.country = countries[randomIndex];
    });
  }

  startGame(): void {
    // Navigate to the /play route
    window.location.href = '/play';
  }
}
