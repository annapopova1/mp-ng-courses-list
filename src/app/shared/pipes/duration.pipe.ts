import { Pipe, PipeTransform } from '@angular/core';

const MINUTES_IN_HOUR = 60;

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(durationInMinutes: number): string {
    const hours = Math.trunc(durationInMinutes / MINUTES_IN_HOUR);
    const minutes = durationInMinutes - hours * MINUTES_IN_HOUR;
    if (hours && minutes) {
      return `${hours}h ${minutes}min`;
    }
    return hours ? `${hours}h` : `${minutes}min`;
  }

}
