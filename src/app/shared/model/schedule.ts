import { Movie } from './movie';

export interface Schedule {
  id: string;
  movie: Movie;
  screenings: Screening[];
}

export interface Screening {
  time: Date;
}
