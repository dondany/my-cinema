import { Component, computed, input, signal } from '@angular/core';
import { Schedule, Screening } from '../../../../shared/model/schedule';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MinutesToHoursPipe } from '../../../../shared/pipes/minutes-to-hours.pipe';

@Component({
  standalone: true,
  selector: 'app-schedule-item',
  template: ` <div class="flex gap-6">
    <img
      class="h-72 aspect-auto shadow-2xl shadow-zinc-200/20"
      [src]="schedule().movie.poster"
      alt="" />
    <div class="w-full p-1 flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <h2 class="font-semibold text-xl">{{ schedule().movie.title }}</h2>
        <div class="flex justify-start items-center gap-3 text-sm opacity-40">
          <div class="flex gap-1 items-center">
            <svg
              class="size-3 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
            </svg>
            <span>{{ schedule().movie.runtime | minutesToHours }}</span>
          </div>
          <span>|</span>
          <span>{{ schedule().movie.genre }}</span>
        </div>
      </div>

      <div class="text-white flex gap-6">
        @for (day of days(); track $index) {
          <div
            aria-hidden="true"
            class="size-30 aspect-square p-2 flex flex-col items-center cursor-pointer rounded"
            (click)="currentDay.set(day)">
            <span
              class="text-sm"
              [ngClass]="isCurrentDay(day) ? 'font-bold' : ''"
              >{{ day.toLocaleDateString('en-US', { weekday: 'short' }) }}</span
            >
            <span
              class="size-fit aspect-square p-1 text-xl font-semibold flex justify-center items-center 
            bg-emerald-400 rounded-full transition-all duration-300"
              [ngClass]="isCurrentDay(day) ? 'bg-opacity-100' : 'bg-opacity-0'"
              >{{ day.getDate() }}</span
            >
            <span class="tex-sm opacity-80">{{
              day.toLocaleDateString('en-US', { month: 'short' })
            }}</span>
          </div>
        }
      </div>

      <div class="mt-auto flex flex-col gap-1">
        @if (screenings().length === 0) {
          <span>No screenings available for the day</span>
        } @else {
          <span>Buy ticket online</span>
        }
        <div class="w-full mt-auto flex gap-3">
          @for (entry of screeningsByRoom(); track $index) {
            <div class="bg-slate-800/60 rounded flex items-center gap-3 p-2">
              <div class="">{{ entry[0] }}</div>
              @for (screening of entry[1]; track $index) {
                <a
                  class="p-2 w-20 flex justify-center rounded border cursor-pointer
              border-emerald-400 hover:bg-emerald-400
              transition-color duration-300">
                  <!-- <a
              class="p-2 w-20 flex justify-center rounded border cursor-pointer
              border-emerald-400 hover:bg-emerald-400
              transition-color duration-300"
              [routerLink]="[schedule().id, screening.id, 'booking']"> -->
                  <span class="text-lg text-white">{{
                    screening.startTime | date: 'H:mm'
                  }}</span>
                </a>
              }
            </div>
          }
        </div>
      </div>
    </div>
  </div>`,
  imports: [CommonModule, RouterLink, MinutesToHoursPipe],
})
export class ScheduleItemComponent {
  schedule = input.required<Schedule>();
  days = input.required<Date[]>();
  currentDay = signal(new Date());

  screenings = computed(() => {
    return this.schedule().screenings.filter(screen => {
      console.log(typeof screen.startTime);
      return screen.startTime.getDate() === this.currentDay().getDate();
    });
  });

  screeningsByRoom = computed(() => {
    const screeningsMap = new Map<string, Screening[]>();

    this.screenings().forEach(screening => {
      const { roomName } = screening;
      if (!screeningsMap.has(roomName)) {
        screeningsMap.set(roomName, []);
      }
      screeningsMap.get(roomName)!.push(screening);
    });

    return screeningsMap;
  });

  isCurrentDay(day: Date) {
    return (
      this.currentDay().getFullYear() === day.getFullYear() &&
      this.currentDay().getMonth() === day.getMonth() &&
      this.currentDay().getDate() == day.getDate()
    );
  }
}
