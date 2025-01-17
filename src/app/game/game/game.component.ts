import { Component, ViewChild } from '@angular/core';
import { Country } from '../../models/country.model';
import { CountriesService } from '../../services/countries.service';
import { Game } from '../../models/game.model';
import { FlagComponent } from '../../shared/flag/flag.component';
import { CdTimerComponent, CdTimerModule } from 'angular-cd-timer';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FlagComponent, CdTimerModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  @ViewChild('roundTimer', { static: true }) roundTimer!: CdTimerComponent;
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

  refreshTimer(): void {
    this.roundTimer.reset();
    this.roundTimer.start();
  }

  flashColor(color: string): void {
    document.body.style.backgroundColor = color;
    setTimeout(() => {
      document.body.style.backgroundColor = '';
    }, 500);
  }

  checkAnswer(answer: number): void {
    this.refreshTimer();
    if (
      answer >= 0 &&
      this.game[this.round].options[answer] === this.game[this.round].answer
    ) {
      this.score++;
      this.flashColor('rgba(0, 255, 0, 0.9)');
    } else {
      this.flashColor('rgba(255, 0, 0, 0.9)');
    }
    this.round++;
    if (this.round === 10) {
      window.location.href = `/score/${this.score}`;
    }
  }

  timeOut(): void {
    this.checkAnswer(-1);
  }
}
