import { Movie } from './movie';

export interface Schedule {
  movie: Movie;
  screenings: Screening[];
}

export interface Screening {
  id: string;
  roomName: string;
  startTime: Date;
}
