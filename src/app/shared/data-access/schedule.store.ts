import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Schedule } from '../model/schedule';
import { inject } from '@angular/core';
import { MovieService } from './movie.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export interface ScheduleState {
  schedules: Schedule[];
}

export const ScheduleStore = signalStore(
  { providedIn: 'root' },
  withState<ScheduleState>({
    schedules: [],
  }),
  withMethods((store, movieService = inject(MovieService)) => {
    return {
      loadSchedules: rxMethod<void>(
        pipe(
          switchMap(() => movieService.getSchedules()),
          tap(schedules => patchState(store, { schedules }))
        )
      ),
    };
  })
);
