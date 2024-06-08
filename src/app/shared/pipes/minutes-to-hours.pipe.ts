import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'minutesToHours',
})
export class MinutesToHoursPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    if (isNaN(value) || value < 0) {
      return 'Invalid input';
    }
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours}h ${minutes}m`;
  }
}
