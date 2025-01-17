import { Country } from './country.model';

export interface Game {
  round: number;
  answer: Country;
  options: Country[];
}
