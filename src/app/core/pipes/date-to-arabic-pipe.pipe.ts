import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToArabic'
})
export class DateToArabicPipe implements PipeTransform {
  private englishToArabicMonths = {
    Jan: 'يناير',
    Feb: 'فبراير',
    Mar: 'مارس',
    Apr: 'أبريل',
    May: 'مايو',
    Jun: 'يونيو',
    Jul: 'يوليو',
    Aug: 'أغسطس',
    Sep: 'سبتمبر',
    Oct: 'أكتوبر',
    Nov: 'نوفمبر',
    Dec: 'ديسمبر'
  };

  private convertToArabicNumerals(number: any): string {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(number).replace(/\d/g, digit => arabicNumerals[parseInt(digit, 10)]);
  }

  transform(value: string): string {
    if (!value) return '';

    const [month, day, year] = value.split(' ');
    const arabicMonth = this.englishToArabicMonths[month];
    const arabicDay = this.convertToArabicNumerals(day.replace(/,/g, ''));
    const arabicYear = this.convertToArabicNumerals(year);

    return `${arabicDay} ${arabicMonth} ${arabicYear}`;
  }
}