import type { HighlightMatchingTextOutput } from './types';

export const highlightMatchingText = (
  searchValue: string,
  rawText: string
): HighlightMatchingTextOutput => {
  if (!searchValue.length) {
    return {
      rawText,
      highlights: [],
    };
  }

  const regex = new RegExp(`(${searchValue})`, 'gi');
  const splitText = rawText.split(regex);

  return {
    rawText,
    highlights: splitText.map((text) => ({
      text,
      isHighlighted: regex.test(text),
    })),
  };
};
