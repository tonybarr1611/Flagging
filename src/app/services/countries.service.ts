import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Country[]> {
    const url = `${environment.apiUrl}/all`;
    return this.http.get<any[]>(url).pipe(
      map((countries) =>
        countries.map((country) => ({
          name: country.name.common,
          flagPng: country.flags.png,
          flagSvg: country.flags.svg,
        }))
      )
    );
  }
}
