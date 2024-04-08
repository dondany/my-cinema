import { Component, input } from '@angular/core';
import { Movie } from '../../../../shared/model/movie';
import { MovieItemComponent } from './movie-item.component';

@Component({
  standalone: true,
  selector: 'app-movie-list',
  template: `
    <div class="flex flex-col">
      <h1 class="uppercase font-semibold">{{ title() }}</h1>
      <div
        class=" w-full h-[2px] max-w-60 my-2 bg-gradient-to-r from-emerald-400"></div>
    </div>
    <div class="p-2 flex flex-wrap gap-8">
      @for (movie of movies(); track $index) {
        <app-movie-item [movie]="movie"></app-movie-item>
      }
    </div>
  `,
  imports: [MovieItemComponent],
})
export class MovieListComponent {
  movies = input.required<Movie[]>();
  title = input.required<string>();
}
