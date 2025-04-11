import { ArabicNumeralsPipe } from './arabic-numerals.pipe';

describe('ArabicNumeralsPipe', () => {
  it('create an instance', () => {
    const pipe = new ArabicNumeralsPipe();
    expect(pipe).toBeTruthy();
  });
});
