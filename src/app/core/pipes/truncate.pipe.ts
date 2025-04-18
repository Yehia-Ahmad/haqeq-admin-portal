import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    if (!value) return value; // Handle null or undefined values
    if (value.length > limit) {
      return value.substring(0, limit) + '...';
    }
    return value;
  }
}