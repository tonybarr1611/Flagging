import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-flag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss'],
})
export class FlagComponent {
  @Input() country!: Country;
  @Input() nameShown: boolean = true;
}
