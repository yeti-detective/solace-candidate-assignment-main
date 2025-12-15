import { describe, expect, test } from '@jest/globals';
import { formatPhoneNumber } from './utils.ts';

describe('Utils', () => {
  describe('formatPhoneNumber', () => {
    test('returns an empty string for an un-formattable number', () => {
      expect(formatPhoneNumber(11)).toEqual("");
    })
    test('formats a number to a UI friendly string', () => {
      const exampleInput = 5553217654; // from db seed data 
      const expectedFormattedString = "555-321-7654";

      expect(formatPhoneNumber(exampleInput)).toEqual(expectedFormattedString);
    })
    test('formats a 7 digit number like we used to have in the 90s', () => {
      const exampleInput = 7636307; // my number in elementary school
      const expectedFormattedString = "763-6307";

      expect(formatPhoneNumber(exampleInput)).toEqual(expectedFormattedString);
    })
  })
});
