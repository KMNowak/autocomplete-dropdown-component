import type { GetHighlightTextOutput } from './types';
import { getHighlightText } from './utils';

describe('utils', () => {
  describe('highlightMatchingText', () => {
    test('should correctly return highlights for matching text', () => {
      const rawText = 'abcde';
      const input = 'bcd';

      const expectedResult: GetHighlightTextOutput = {
        rawText,
        highlights: [
          { text: 'a', isHighlighted: false },
          { text: 'bcd', isHighlighted: true },
          { text: 'e', isHighlighted: false },
        ],
      };

      const res = getHighlightText(input, rawText);

      expect(res).toMatchObject(expectedResult);
    });

    test('should not return any highlights if searchValue is empty', () => {
      const rawText = 'abcde';
      const input = '';

      const expectedResult: GetHighlightTextOutput = {
        rawText,
        highlights: [],
      };

      const res = getHighlightText(input, rawText);

      expect(res).toMatchObject(expectedResult);
    });
  });
});
