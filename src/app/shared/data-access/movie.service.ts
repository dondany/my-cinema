import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);

  BASE_URL = 'http://localhost:8000';

  getMovies() {
    return this.http.get<Movie[]>(`${this.BASE_URL}/movies`);
  }
}
