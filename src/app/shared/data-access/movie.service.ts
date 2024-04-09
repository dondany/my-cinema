import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Movie } from '../model/movie';
import { Schedule } from '../model/schedule';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);

  BASE_URL = 'http://localhost:8000';

  getMovies() {
    return this.http.get<Movie[]>(`${this.BASE_URL}/movies`);
  }

  getSchedules() {
    return this.http
      .get<Schedule[]>(`${this.BASE_URL}/schedules?_embed=movie`)
      .pipe(
        map(schedules =>
          schedules.map(schedule => {
            schedule.screenings.map(screen => {
              screen.time = new Date(screen.time);
              return screen;
            });
            return schedule;
          })
        )
      );
  }
}
