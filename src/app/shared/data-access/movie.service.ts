import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Movie } from '../model/movie';
import { Schedule } from '../model/schedule';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);

  BASE_URL = '/api';
  getMovies() {
    return this.http.get<Movie[]>(`${this.BASE_URL}/movies`);
  }

  getSchedules() {
    return this.http.get<Schedule[]>(`${this.BASE_URL}/movies/schedules`).pipe(
      map(schedules =>
        schedules.map(schedule => {
          schedule.screenings.map(screen => {
            screen.startTime = new Date(screen.startTime);
            return screen;
          });
          return schedule;
        })
      )
    );
  }
}
