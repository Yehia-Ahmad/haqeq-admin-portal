import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arabicNumerals'
})
export class ArabicNumeralsPipe implements PipeTransform {
  // Define the mapping of standard digits to Arabic-Indic digits
  private arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

  transform(value: any): string {
    if (value == null || value === '') return '';

    // Convert the input value to a string
    const stringValue = String(value);

    // Replace each digit with its corresponding Arabic numeral
    return stringValue.replace(/\d/g, (digit) => this.arabicNumerals[parseInt(digit, 10)]);
  }
}