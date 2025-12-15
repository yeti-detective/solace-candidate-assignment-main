import { describe, expect, test } from '@jest/globals';
import { formatPhoneNumber } from './utils.ts';

describe('Utils', () => {
  describe('formatPhoneNumber', () => {
    test('should be defined', () => {
      expect(formatPhoneNumber).toBeDefined();
    })
  })
});
