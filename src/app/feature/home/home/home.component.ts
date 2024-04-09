import { Component, OnInit, inject } from '@angular/core';
import { MovieListComponent } from './ui/movie-list.component';
import { MovieStore } from '../../../shared/data-access/movie.store';

@Component({
  standalone: true,
  selector: 'app-home',
  template: ` <div class="mt-12 text-zinc-200 flex flex-col gap-12">
    <app-movie-list [movies]="movieStore.onScreenMovies()" title="On Screen" />
    <app-movie-list
      [movies]="movieStore.comingSoonMovies()"
      title="Coming soon" />
  </div>`,
  imports: [MovieListComponent],
})
export default class HomeComponent implements OnInit {
  movieStore = inject(MovieStore);

  ngOnInit(): void {
    this.movieStore.loadMovies();
  }
}
