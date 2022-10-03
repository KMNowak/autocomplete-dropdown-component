import type { HighlightMatchingTextOutput } from './types';
import { highlightMatchingText } from './utils';

describe('utils', () => {
  describe('highlightMatchingText', () => {
    test('should correctly return highlights for matching text', () => {
      const rawText = 'abcde';
      const input = 'bcd';

      const expectedResult: HighlightMatchingTextOutput = {
        rawText,
        highlights: [
          { text: 'a', isHighlighted: false },
          { text: 'bcd', isHighlighted: true },
          { text: 'e', isHighlighted: false },
        ],
      };

      const res = highlightMatchingText(input, rawText);

      expect(res).toMatchObject(expectedResult);
    });

    test('should not return any highlights if searchValue is empty', () => {
      const rawText = 'abcde';
      const input = '';

      const expectedResult: HighlightMatchingTextOutput = {
        rawText,
        highlights: [],
      };

      const res = highlightMatchingText(input, rawText);

      expect(res).toMatchObject(expectedResult);
    });
  });
});
