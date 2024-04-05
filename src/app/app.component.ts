import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export interface Movie {
  id: string;
  title: string;
  duration: string;
  genre: string;
  poster: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="p-8">
      <nav class="flex justify-between items-center text-zinc-300">
        <div
          class="text-2xl font-semibold bg-gradient-to-r 
        from-emerald-700  to-emerald-500 
        inline-block text-transparent bg-clip-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
          </svg>
          <span>My Cinema</span>
        </div>
        <div class="flex gap-12 items-center ">
          <a
            class="p-2 border-b border-transparent transition-colors duration-300
        hover:text-zinc-100 hover:border-zinc-100"
            href="#">
            Home
          </a>
          <a
            class="p-2 border-b border-transparent transition-colors duration-300
        hover:text-zinc-100 hover:border-zinc-100"
            href="#"
            >Schedule</a
          >
          <a
            class="p-2 border-b border-transparent transition-colors duration-300
        hover:text-zinc-100 hover:border-zinc-100"
            href="#"
            >Movies</a
          >
          <button
            (click)="send()"
            class="py-2 px-6 font-semibold rounded
        bg-emerald-500 text-white hover:bg-emerald-600">
            Sign In
          </button>
        </div>
      </nav>

      <section class="mt-12 text-zinc-200 flex flex-col gap-12">
        <div>
          <div class="flex flex-col">
            <h1 class="uppercase font-semibold">On Screen</h1>
            <div
              class=" w-full h-[2px] max-w-60 my-2 bg-gradient-to-r from-emerald-400"></div>
          </div>
          <div class="p-2 flex flex-wrap gap-8">
            @for (movie of movies; track $index) {
              <div>
                <div class="w-52 h-72 relative shadow-2xl shadow-zinc-200/20">
                  <div
                    class="p-4 absolute group h-full w-full flex justify-center items-center 
                    bg-transparent transition-colors duration-200
                  hover:bg-zinc-900/80">
                    <div
                      class="size-full flex flex-col justify-center items-center
                      opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <button
                        class="mt-auto px-4 py-2 rounded border-2 font-semibold 
                      border-emerald-400 bg-zinc-900/50 hover:bg-zinc-900/80">
                        Buy Ticket
                      </button>
                      <button
                        class="mt-auto fill-emerald-400 flex items-center gap-1">
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
                    [src]="movie.poster"
                    [alt]="movie.title" />
                </div>

                <div class="py-4 flex flex-col">
                  <span class="font-semibold">{{ movie.title }}</span>
                  <div class="flex justify-between text-sm text-zinc-400">
                    <span>{{ movie.duration }}</span>
                    <span>{{ movie.genre }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>

        <div>
          <div class="flex flex-col">
            <h1 class="uppercase font-semibold">Coming soon</h1>
            <div
              class=" w-full h-[2px] max-w-60 my-2 bg-gradient-to-r from-emerald-400"></div>
          </div>
          <div class="p-2 flex flex-wrap gap-8">
            <div>
              <img
                class="object-cover w-52 h-72"
                src="https://m.media-amazon.com/images/M/MV5BOTJiNDEzOWYtMTVjOC00ZjlmLWE0NGMtZmE1OWVmZDQ2OWJhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_FMjpg_UY3000_.jpg"
                alt="The Godfather poster" />
              <div class="py-4 flex flex-col">
                <span class="font-semibold">Inglourious Basterds</span>
                <div class="flex justify-between text-sm text-zinc-400">
                  <span>2h 33m</span>
                  <span>Drama, War</span>
                </div>
              </div>
            </div>

            <div>
              <img
                class="object-cover w-52 h-72"
                src="https://m.media-amazon.com/images/M/MV5BMTAzMTQzMTA2MjheQTJeQWpwZ15BbWU4MDk2MTg2MzUx._V1_FMjpg_UY2048_.jpg"
                alt="The Godfather poster" />
              <div class="py-4 flex flex-col">
                <span class="font-semibold">The Age of Adaline</span>
                <div class="flex justify-between text-sm text-zinc-400">
                  <span>1h 52m</span>
                  <span>Fantasy, Romance, Drama</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);

  movies: Movie[] = [];

  ngOnInit(): void {
    this.http
      .get<Movie[]>('http://localhost:8000/movies')
      .subscribe(movies => (this.movies = movies));
  }

  send() {
    const date = new Date();
    console.log('data:', date);
  }
}
