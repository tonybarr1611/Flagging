import { Component } from '@angular/core';
import { Country } from '../../models/country.model';
import { CountriesService } from '../../services/countries.service';
import { Game } from '../../models/game.model';
import { FlagComponent } from '../../shared/flag/flag.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FlagComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  score = 0;
  countries: Country[] = [];
  game: Game[] = [];
  round = 0;

  constructor(private countriesService: CountriesService) {
    this.getCountries();
    this.generateGame();
  }

  getCountries(): void {
    this.countriesService.getAll().subscribe((countries: Country[]) => {
      this.countries = countries;
    });
  }

  generateGame(): void {
    this.game = [];
    for (let i = 0; i < 10; i++) {
      const options: Country[] = [];
      for (let j = 0; j < 4; j++) {
        const randomIndex = Math.floor(Math.random() * this.countries.length);
        options.push(this.countries[randomIndex]);
      }
      this.game.push({
        round: i + 1,
        options,
        answer: options[Math.floor(Math.random() * options.length)],
      });
    }
  }

  checkAnswer(answer: number): void {
    if (
      this.game[this.round].options[answer] === this.game[this.round].answer
    ) {
      this.score++;
      // Show a brief green background to indicate the correct answer, with not 100% opacity
      document.body.style.backgroundColor = 'rgba(0, 255, 0, 0.9)';
      setTimeout(() => {
        document.body.style.backgroundColor = '';
      }, 500);
    } else {
      // Show a brief red background to indicate the incorrect answer, with not 100% opacity
      document.body.style.backgroundColor = 'rgba(255, 0, 0, 0.9)';
      setTimeout(() => {
        document.body.style.backgroundColor = '';
      }, 500);
    }
    this.round++;
    if (this.round === 10) {
      // Navigate to the /score route
      window.location.href = `/score/${this.score}`;
    }
  }
}
