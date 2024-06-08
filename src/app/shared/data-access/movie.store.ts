import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Movie } from '../model/movie';
import { pipe, switchMap, tap } from 'rxjs';
import { computed, inject } from '@angular/core';
import { MovieService } from './movie.service';

export interface MovieState {
  movies: Movie[];
}

export const MovieStore = signalStore(
  { providedIn: 'root' },
  withState<MovieState>({
    movies: [],
  }),
  withMethods((store, movieService = inject(MovieService)) => {
    return {
      loadMovies: rxMethod<void>(
        pipe(
          switchMap(() => movieService.getMovies()),
          tap(r => console.log(r)),
          tap(movies => patchState(store, { movies }))
        )
      ),
    };
  }),
  withComputed(store => ({
    onScreenMovies: computed(() => {
      return store.movies().filter(movie => movie.state === 'ON_SCREEN');
    }),
    comingSoonMovies: computed(() => {
      return store.movies().filter(movie => movie.state === 'COMING_SOON');
    }),
  }))
);
