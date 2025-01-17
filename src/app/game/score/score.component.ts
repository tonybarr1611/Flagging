import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
})
export class ScoreComponent {
  // Get score from the url, score/:score
  @Input() score: number = 0;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.score = params['score'];
    });
  }

  restartGame(): void {
    // Navigate to the /play route
    window.location.href = '/home';
  }
}
