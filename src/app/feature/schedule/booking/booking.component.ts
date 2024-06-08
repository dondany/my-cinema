import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-booking',
  template: `
    <div class="mt-20 w-fit flex flex-col gap-16">
      <div
        class="m-auto h-2 w-[70%] bg-gradient-to-r from-zinc-600 via-zinc-500 to-zinc-600 rounded"></div>
      <div class="w-fit grid grid-cols-20 gap-x-2 gap-y-3">
        @for (seat of seats; track $index) {
          @if (seat !== 'empty') {
            <button
              (click)="selectSeat($index)"
              [attr.aria-label]="seat"
              class="size-4 bg-gradient-to-b from-zinc-600/50 to-zinc-700/50 rounded-t"></button>
          } @else {
            <span class="size-4"></span>
          }
        }
      </div>
    </div>
  `,
})
export default class BookingComponent {
  seats: string[] = [];

  constructor() {
    for (let i = 0; i < 200; i++) {
      this.seats.push('seat');
    }
  }

  selectSeat(id: number) {
    this.seats[id] = 'empty';
    console.log(this.seats);
  }
}
