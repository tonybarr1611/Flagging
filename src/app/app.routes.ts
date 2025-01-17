import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { GameComponent } from './game/game/game.component';
import { ScoreComponent } from './game/score/score.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'play', component: GameComponent },
  { path: 'score/:score', component: ScoreComponent },
];
