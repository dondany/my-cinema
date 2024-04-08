import { Component, input } from '@angular/core';
import { Movie } from '../../../../shared/model/movie';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-movie-item',
  template: ` <div>
    <div class="w-52 h-72 relative shadow-2xl shadow-zinc-200/20">
      @if (movie().status === 'coming-soon') {
        <span
          class="absolute z-20 p-2 -left-2 top-4 bg-emerald-500 text-white uppercase font-semibold">
          {{ movie().premiere }}</span
        >
      }
      <div
        class="p-4 absolute group h-full w-full flex justify-center items-center 
                    bg-transparent transition-colors duration-200
                  hover:bg-zinc-900/80">
        <div
          class="size-full flex flex-col justify-center items-center
                      opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          @if (movie().status === 'on-screen') {
            <button
              class="mt-auto px-4 py-2 rounded border-2 font-semibold 
                      border-emerald-400 bg-zinc-900/50 hover:bg-zinc-900/80">
              Buy Ticket
            </button>
          }

          <button
            class="fill-emerald-400 flex items-center gap-1"
            [ngClass]="{ 'mt-auto': movie().status === 'on-screen' }">
            <svg
              class="size-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z" />
            </svg>
            <div class="flex flex-col">
              <span class="font-semibold">Watch</span>
              <span class="font-semibold">Trailer</span>
            </div>
          </button>
        </div>
      </div>
      <img
        class="object-cover w-52 h-72"
        [src]="movie().poster"
        [alt]="movie().title" />
    </div>

    <div class="py-4 flex flex-col">
      <span class="font-semibold">{{ movie().title }}</span>
      <div class="flex justify-between text-sm text-zinc-400">
        <span>{{ movie().duration }}</span>
        <span>{{ movie().genre }}</span>
      </div>
    </div>
  </div>`,
  imports: [CommonModule],
})
export class MovieItemComponent {
  movie = input.required<Movie>();
}
