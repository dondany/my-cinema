import { Component, OnInit, inject } from '@angular/core';
import { ScheduleStore } from '../../../shared/data-access/schedule.store';
import { CommonModule } from '@angular/common';
import { ScheduleItemComponent } from './ui/schedule-item.component';

@Component({
  standalone: true,
  selector: 'app-schedule',
  template: `<div class="mt-12 flex flex-col">
    <div class="flex flex-col">
      <h1 class="uppercase font-semibold text-white">Schedule</h1>
      <div
        class=" w-full h-[2px] max-w-60 my-2 bg-gradient-to-r from-emerald-400"></div>
    </div>
    <div class="flex flex-col gap-6 text-white">
      @for (schedule of scheduleStore.schedules(); track $index) {
        <app-schedule-item
          [schedule]="schedule"
          [days]="days"></app-schedule-item>
      }
    </div>
  </div>`,
  imports: [CommonModule, ScheduleItemComponent],
})
export default class ScheduleComponent implements OnInit {
  scheduleStore = inject(ScheduleStore);

  days: Date[] = this.initDays();
  currentDay: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    this.scheduleStore.loadSchedules();
  }

  initDays() {
    const today = new Date();
    const lastDay = new Date(today);
    lastDay.setDate(lastDay.getDate() + 7);

    const days: Date[] = [];
    for (
      let currentDate = today;
      currentDate.getDate() < lastDay.getDate();
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      days.push(new Date(currentDate));
    }

    return days;
  }

  isCurrentDay(day: Date) {
    return (
      this.currentDay.getFullYear() === day.getFullYear() &&
      this.currentDay.getMonth() === day.getMonth() &&
      this.currentDay.getDate() == day.getDate()
    );
  }
}
